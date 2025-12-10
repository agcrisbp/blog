<div align="center">
  <a href="https://aghea.vercel.app/twitter">
  <img src="public/twitter-badge.svg" alt="Follow me on Twitter"/>
</a>
  <a href="https://saweria.co/agcrisbp">
    <img src="public/sponsor-badge.svg" alt="Sponsor This Repo" />
  </a>
  
</div>

<p align="center">
    <img alt='GitHub Clones' src='https://img.shields.io/badge/dynamic/json?color=success&label=Clone&query=count&url=https://gist.githubusercontent.com/agcrisbp/e4ef17ae8fc3c995010a3b66a395735f/raw/clone.json&logo=github'>
    <img alt='GitHub Clones' src='https://img.shields.io/badge/dynamic/json?color=success&label=Unique&query=uniques&url=https://gist.githubusercontent.com/agcrisbp/e4ef17ae8fc3c995010a3b66a395735f/raw/clone.json&logo=githubactions&logoColor=white'>
</p>

---

## Example CodeBlock

- Code

```
<Pre
  codeBlocks={[
    {
      language: 'javascript',
      content: `var greeting = "Hello, World!";
console.log(greeting);`,
    },
  ]}
/>
```

- Dropdown CodeBlock

```
<Pre
  codeBlocks={[
    {
      label: 'JavaScript',
      language: 'javascript',
      content: `var greeting = "Hello, World!";
console.log(greeting);`,
    },
    {
      label: 'HTML',
      language: 'html',
      content: `<html>
    <body>
      <p>Hello, World!
      </p>
    </body>
</html>`,
    },
  ]}
/>
```

- iFrame

```
<Pre
  codeBlocks={[
    {
      iframe: true,
      content: `<html>
    <body>
      <p>Hello, World!
      </p>
    </body>
</html>`,
    },
  ]}
/>
```

> You still can use `triple-backsticks` but it will be rendered without CopyButton (Its Pre components).

---

## Sponsor

- [Saweria](https://saweria.co/agcrisbp)
- [Paypal](https://paypal.me/agcrisbp)

## License

[MIT](/LICENSE)
