// interface PropTypes {
//     title?: string
// }

// const PageHead = (props: PropTypes) => {
//     const { title = 'acara' } = props
//     const Head = document.head || document.getElementsByTagName('head')[0]
//     return (
//         <Head>
//             <title>{title}</title>
//             <meta charSet="UTF-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//             <link rel="icon" href="/images/general/logo.svg" type="image/x-icon" />
//         </Head>
//     )
// }

// export default PageHead


export const titleChanger = (title:string) =>{
    document.title = title
}