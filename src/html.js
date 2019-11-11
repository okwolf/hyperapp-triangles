const tags = ["div", "main"]

export default h =>
  tags.reduce(
    (otherTags, tag) => ({
      ...otherTags,
      [tag]: (...args) =>
        typeof args[0] === "object"
          ? "props" in args[0]
            ? h(tag, {}, ...args)
            : h(tag, ...args)
          : h(tag, {}, ...args)
    }),
    {}
  )
