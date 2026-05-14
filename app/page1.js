function Header() {
  return (
    <div style={{
      textAlign: "center",
      backgroundColor: "grey"
    }}>
      <h1 style={{
        fontSize: "40px",
        paddingTop: "20px"
      }}>Ram Sai Boddu</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          paddingBottom: "20px"
        }}
      >
        <h3>bodduramsai16@gmail.com</h3>
        <h3>GitHub</h3>
        <h3>LinkedIn</h3>
        <h3>StopStalk</h3>
      </div>
    </div>
  )
}

function Objective() {
  return (
    <div
      style={{
        padding: "20px"
      }}
    >
      <h2>Objective</h2>

      <p>
        Motivated Computer Science student interested in
        Full Stack Development and DevOps.
      </p>
    </div>
  )
}

export default function Portfolio() {

  return (
    <div>
      <div
        style={{
          width: "60%",
          height: "600px",
          margin: "30px auto",
          border: "2px solid black"
        }}
      >
        <Header />
        <Objective/>
      </div>
    </div>
  )
}