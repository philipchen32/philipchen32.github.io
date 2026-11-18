// Give browsers a named, keyboard-focusable scroll region for wide content.
export function scrollableContent() {
  return (tree) => {
    function wrap(node) {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && ['table', 'pre'].includes(child.tagName)) {
          return {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['scroll-region'],
              role: 'region',
              ariaLabel: child.tagName === 'table' ? 'Table' : 'Code or text diagram',
              tabIndex: 0,
            },
            children: [child],
          };
        }
        wrap(child);
        return child;
      });
    }
    wrap(tree);
  };
}
