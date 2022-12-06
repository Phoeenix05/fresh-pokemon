import { Handlers, PageProps } from "$fresh/server.ts";
import { IPokemon } from "../interfaces/pokemon.ts";

const header = `
  font-semibold
  text-xl
  mt-2 mb-4
`

// const fetchData = async (name: string) => {
//   const response: IPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
//     .then(res => res.json())
//     .catch(_ => undefined)
  
//   return response
// }

export const handler: Handlers<IPokemon | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    
    if (response.status === 404) return ctx.render(null)
    
    const pokemon = await response.json()
    return ctx.render(pokemon)
  }
}

export default function Greet({ data }: PageProps<IPokemon | null>) {
  if (!data) {
    return <h1>pokemon not found</h1>
  }
  
  return <>
    <h2 class={header}>{ data.name }</h2>
    <img src={ data.sprites.front_default } />

    <h2 class={header}>Types</h2>
    <img src={ data.sprites.front_default } />
    
    <h2 class={header}>Moves</h2>
    { data.types.map((e) => <p>{ e.type.name }</p>) }
    
    <h2 class={header}>Abilities</h2>
    { data.abilities.map((e) => <p>{ e.ability.name }</p>) }

    <h2 class={header}>Sprites</h2>
    <div class="flex flex-row flex-wrap">
      <img src={ data.sprites.front_default } />
      <img src={ data.sprites.front_shiny } />
      <img src={ data.sprites.front_female } />
      <img src={ data.sprites.front_shiny_female } />
    </div>
  </>
}
