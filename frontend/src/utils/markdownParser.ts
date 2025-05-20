import { marked } from "marked";

export function getMarkdownParser() {
  const customRenderer = new marked.Renderer();

  // Render headings as <p> tags with a class based on the heading level - SEO reasons
  customRenderer.heading = (heading) => {
    const { text, depth } = heading;

    return `<p class="h${depth}">${text}</p>\n`;
  };

  marked.setOptions({
    renderer: customRenderer,
  });

  return marked;
}
