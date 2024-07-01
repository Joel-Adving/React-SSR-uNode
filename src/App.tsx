import HelloWorld from './HelloWorld'

export default function ReactApp() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My app</title>
      </head>
      <body>
        <div id="root">
          <HelloWorld name="World" />
          {/* <Router /> */}
        </div>
      </body>
    </html>
  )
}
