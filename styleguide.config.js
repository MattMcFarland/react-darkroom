module.exports = {
  title: 'React Darkroom Style Guide',
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Documentation',
      sections: [
        {
          name: 'Installation',
          content: 'docs/installation.md',
        },
        {
          name: 'Configuration',
          content: 'docs/configuration.md',
        },
      ],
    },
    {
      name: 'Higher Order Components',
      components: 'packages/react-darkroom-history-hoc/src/[A-Z]*.jsx',
    },
    {
      name: 'Dumb Components',
      components: 'packages/react-darkroom-[icons|tooltips|toolbar]*/src/[A-Z]*.jsx',
    },
    // {
    //   name: 'All',
    //   components: 'packages/react-darkroom*/src/[A-Z]*.jsx',
    // },
    // {
    //   name: 'Documentation',
    //   sections: [
    //     {
    //       name: 'First File',
    //       content: 'docs/One.md',
    //     },
    //     {
    //       name: 'Second File',
    //       content: 'docs/Two.md',
    //     },
    //   ],
    // },
  ],
};
