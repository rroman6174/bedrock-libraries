# bedrock-libraries

## Overview

This repository contains the source code for the [@bedrock-libraries](https://www.npmjs.com/settings/bedrock-libraries/packages) npm package. It contains useful typescript libraries that can be incorporated into your minecraft bedrock behavior pack scripts.

### Usage

Import one of the libraries into your existing npm project by running

```
npm install @bedrock-libraries/<packageName>
```

You should then be able to import them into your scripts in the usual way.

````
import {Logger} from "@bedrock-libraries/logger";
```

If you aren't already using a bundler, you will also need to install one (such as `esbuild`) so that the library code will be included in your packaged addon for Minecraft to read. Alternatively you can download the code directly from the releases section and copy it into your project.

## Adding a new library

To create a new library, run the command `nx g @nrwl/js:library math --buildable --importPath=@bedrock-libraries/math --publishable`. Replacing `math` with the name of the new library.



Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

````

nx <target> <project> <...options>

```

You can also run multiple targets:

```

nx run-many -t <target1> <target2>

```

..or add `-p` to filter specific projects

```

nx run-many -t <target1> <target2> -p <proj1> <proj2>

```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the Project Graph

Run `nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
```
