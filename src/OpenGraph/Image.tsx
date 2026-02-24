import logo from '../logo.svg'

export default function OpenGraph(
  title: string,
  coverImage: string,
) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        backgroundColor: "var(--color-bg)",
        backgroundSize: "cover",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        alignItems: "center",
        position: "relative",
      }}
    >
      <h1
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          padding: "2rem 4rem",
          fontSize: "5rem",
          textOverflow: "ellipsis",
          overflow: "hidden",
          fontWeight: "bold",
          color: "white",
          fontFamily: "Inter",
          wordBreak: "break-word",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          margin: "2.5rem",
        }}
      >
        <img
          src={coverImage}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "24px",
          }}
        />
      </div>
      // This places a logo on the bottom right of the image on the top layer.
      <img
        src={logo}
        style={{ position: "absolute", bottom: "0", right: "0", zIndex: 100 }}
        width="146px"
      />
    </div>
  );
};
