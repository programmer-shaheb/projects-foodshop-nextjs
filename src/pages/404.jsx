import Image from "next/image";

export default function Custom404() {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <Image
          src="/img/404-img.svg"
          objectFit="contain"
          layout="fill"
          alt="404Image"
        />
      </div>
    </>
  );
}
