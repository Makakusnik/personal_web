import { marked } from "marked";

export function getMarkdownParser() {
  const customRenderer = new marked.Renderer();

  customRenderer.heading = (heading) => {
    const { text, depth } = heading;

    return `<h${depth} class="h${depth}">${text}</h${depth}>\n`;
  };

  marked.setOptions({
    renderer: customRenderer,
  });

  return marked;
}
