

export function ColorBox({ color,id }) {
  const styles = {
    backgroundColor: color,
    height: "40px",
    width: "650px",
    marginTop: "10px"
  };
  return <div style={styles}></div>;
}
