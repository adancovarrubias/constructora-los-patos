import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GlobalContextProviders } from "./components/_globalContextProviders";
import Page_0 from "./pages/_index.tsx";
import PageLayout_0 from "./pages/_index.pageLayout.tsx";
import Page_1 from "./pages/contacto.tsx";
import PageLayout_1 from "./pages/contacto.pageLayout.tsx";
import Page_2 from "./pages/nosotros.tsx";
import PageLayout_2 from "./pages/nosotros.pageLayout.tsx";
import Page_3 from "./pages/desarrollos.tsx";
import PageLayout_3 from "./pages/desarrollos.pageLayout.tsx";
import Page_4 from "./pages/politica-de-calidad.tsx";
import PageLayout_4 from "./pages/politica-de-calidad.pageLayout.tsx";
import Page_5 from "./pages/desarrollos.torres-colon.tsx";
import PageLayout_5 from "./pages/desarrollos.torres-colon.pageLayout.tsx";
import Page_6 from "./pages/desarrollos.ecoterra-paraiso.tsx";
import PageLayout_6 from "./pages/desarrollos.ecoterra-paraiso.pageLayout.tsx";
import Page_7 from "./pages/desarrollos.las-ceibas-manzanillo.tsx";
import PageLayout_7 from "./pages/desarrollos.las-ceibas-manzanillo.pageLayout.tsx";

if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => {
    setTimeout(cb, 1);
  };
}

import "./base.css";

const fileNameToRoute = new Map([["./pages/_index.tsx","/"],["./pages/contacto.tsx","/contacto"],["./pages/nosotros.tsx","/nosotros"],["./pages/desarrollos.tsx","/desarrollos"],["./pages/politica-de-calidad.tsx","/politica-de-calidad"],["./pages/desarrollos.torres-colon.tsx","/desarrollos/torres-colon"],["./pages/desarrollos.ecoterra-paraiso.tsx","/desarrollos/ecoterra-paraiso"],["./pages/desarrollos.las-ceibas-manzanillo.tsx","/desarrollos/las-ceibas-manzanillo"]]);
const fileNameToComponent = new Map([
    ["./pages/_index.tsx", Page_0],
["./pages/contacto.tsx", Page_1],
["./pages/nosotros.tsx", Page_2],
["./pages/desarrollos.tsx", Page_3],
["./pages/politica-de-calidad.tsx", Page_4],
["./pages/desarrollos.torres-colon.tsx", Page_5],
["./pages/desarrollos.ecoterra-paraiso.tsx", Page_6],
["./pages/desarrollos.las-ceibas-manzanillo.tsx", Page_7],
  ]);

function makePageRoute(filename: string) {
  const Component = fileNameToComponent.get(filename);
  return <Component />;
}

function toElement({
  trie,
  fileNameToRoute,
  makePageRoute,
}: {
  trie: LayoutTrie;
  fileNameToRoute: Map<string, string>;
  makePageRoute: (filename: string) => React.ReactNode;
}) {
  return [
    ...trie.topLevel.map((filename) => (
      <Route
        key={fileNameToRoute.get(filename)}
        path={fileNameToRoute.get(filename)}
        element={makePageRoute(filename)}
      />
    )),
    ...Array.from(trie.trie.entries()).map(([Component, child], index) => (
      <Route
        key={index}
        element={
          <Component>
            <Outlet />
          </Component>
        }
      >
        {toElement({ trie: child, fileNameToRoute, makePageRoute })}
      </Route>
    )),
  ];
}

type LayoutTrieNode = Map<
  React.ComponentType<{ children: React.ReactNode }>,
  LayoutTrie
>;
type LayoutTrie = { topLevel: string[]; trie: LayoutTrieNode };
function buildLayoutTrie(layouts: {
  [fileName: string]: React.ComponentType<{ children: React.ReactNode }>[];
}): LayoutTrie {
  const result: LayoutTrie = { topLevel: [], trie: new Map() };
  Object.entries(layouts).forEach(([fileName, components]) => {
    let cur: LayoutTrie = result;
    for (const component of components) {
      if (!cur.trie.has(component)) {
        cur.trie.set(component, {
          topLevel: [],
          trie: new Map(),
        });
      }
      cur = cur.trie.get(component)!;
    }
    cur.topLevel.push(fileName);
  });
  return result;
}

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Go back to the <a href="/" style={{ color: 'blue' }}>home page</a>.</p>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <GlobalContextProviders>
        <Routes>
          {toElement({ trie: buildLayoutTrie({
"./pages/_index.tsx": PageLayout_0,
"./pages/contacto.tsx": PageLayout_1,
"./pages/nosotros.tsx": PageLayout_2,
"./pages/desarrollos.tsx": PageLayout_3,
"./pages/politica-de-calidad.tsx": PageLayout_4,
"./pages/desarrollos.torres-colon.tsx": PageLayout_5,
"./pages/desarrollos.ecoterra-paraiso.tsx": PageLayout_6,
"./pages/desarrollos.las-ceibas-manzanillo.tsx": PageLayout_7,
}), fileNameToRoute, makePageRoute })} 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalContextProviders>
    </BrowserRouter>
  );
}
