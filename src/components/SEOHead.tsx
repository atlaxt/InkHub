import Head from "next/head";

export default function SEOHead() {
  return (
    <Head>
      <title>Border Generator - Customize Borders with Tailwind CSS</title>
      <meta
        name="description"
        content="Create custom borders using Tailwind CSS with our Border Generator. Adjust border radius, width, and color in real-time and copy the CSS or Tailwind classes instantly."
      />
      <meta
        name="keywords"
        content="border generator, tailwind css, border radius, online css generator, css border generator"
      />
      <meta name="author" content="atlasyigitaydin" />

      <meta property="og:title" content="Border Generator - Customize Borders with Tailwind CSS" />
      <meta
        property="og:description"
        content="Create custom borders using Tailwind CSS. Adjust border radius, width, and color in real-time and copy the generated styles instantly!"
      />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Border Generator - Tailwind CSS" />
      <meta
        name="twitter:description"
        content="Easily generate and customize borders using Tailwind CSS!"
      />
      <meta name="twitter:creator" content="@atlasyigitaydin" />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
