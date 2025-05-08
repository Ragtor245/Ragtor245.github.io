// Plain JavaScript file with no JSX or React components

export default function NotFound() {
  return (
    <html>
      <head>
        <title>404 - Page Not Found</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #111827;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .container {
            text-align: center;
            max-width: 28rem;
            padding: 1rem;
          }
          h1 {
            font-size: 2.25rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          .subtitle {
            font-size: 1.25rem;
            color: #d1d5db;
            margin-bottom: 1.5rem;
          }
          .divider {
            height: 0.25rem;
            width: 5rem;
            background-color: #4f46e5;
            margin: 1.5rem auto;
          }
          .message {
            color: #9ca3af;
            margin-bottom: 1.5rem;
          }
          .home-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #4f46e5;
            color: white;
            border-radius: 0.375rem;
            font-weight: 500;
            text-decoration: none;
          }
        `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <h1>404 - 页面未找到</h1>
          <p className="subtitle">抱歉，您请求的页面不存在或已被移动。</p>
          <div className="divider"></div>
          <p className="message">请检查URL是否正确，或返回首页继续浏览。</p>
          <a href="/" className="home-link">
            返回首页
          </a>
        </div>
      </body>
    </html>
  )
}
