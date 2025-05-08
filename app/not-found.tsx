export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: "1rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "28rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          404 - 页面未找到
        </h1>

        <p
          style={{
            fontSize: "1.25rem",
            color: "#d1d5db",
            marginBottom: "1.5rem",
          }}
        >
          抱歉，您请求的页面不存在或已被移动。
        </p>

        <div
          style={{
            height: "0.25rem",
            width: "5rem",
            backgroundColor: "#4f46e5",
            margin: "1.5rem auto",
          }}
        ></div>

        <p
          style={{
            color: "#9ca3af",
            marginBottom: "1.5rem",
          }}
        >
          请检查URL是否正确，或返回首页继续浏览。
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#4f46e5",
            color: "white",
            borderRadius: "0.375rem",
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          返回首页
        </a>
      </div>
    </div>
  )
}
