import React, { Component } from 'react';
import { Tree, SampleTree, minimalTheme } from 'react-lazy-paginated-tree';
import LazySample from './sample/Lazy';
import LazyPaginatedSample from './sample/LazyPaginated';
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import { prism } from 'react-syntax-highlighter/styles/prism';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import './App.css';
import Code from '@material-ui/icons/Code';

registerLanguage('jsx', jsx);

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const loadChildren = async (node: Node, pageLimit: number = 5) => {
  await sleep(500);
  let children = [];
  for (let i = 0; i < pageLimit; i++) {
    children.push({
      id: i * node.page,
      name: `${node.name}${i * node.page}`,
      description: '',
      children: [],
      numChildren: pageLimit,
      page: 0,
      expanded: false,
      selected: false,
    });
  }
  return children;
};

const loadChildrenPaginated = async (node: Node, pageLimit: number = 5) => {
  await sleep(500);
  let children = [];
  for (let i = 0; i < pageLimit; i++) {
    children.push({
      id: i * node.page,
      name: `${node.name}${i + (node.page - 1) * pageLimit}`,
      description: '',
      children: [],
      numChildren: pageLimit * 3,
      page: 0,
      expanded: false,
      selected: false,
    });
  }
  return children;
};

class App extends Component {
  state = {
    showCode1: false,
    showCode2: false,
    showCode3: false,
    showCode4: false,
    showCode5: false,
  };
  render() {
    const {
      showCode1,
      showCode2,
      showCode3,
      showCode4,
      showCode5,
    } = this.state;
    return (
      <div className="App">
        <h1>React-Lazy-Paginated-Tree Demo</h1>
        <h2>
          Default Material UI Theme
          <Code
            onClick={() => this.setState({ showCode1: !this.state.showCode1 })}
            style={{ float: 'right', fontSize: 40, cursor: 'pointer' }}
          />
        </h2>
        {!showCode1 ? (
          <Tree nodes={JSON.parse(JSON.stringify(SampleTree))} />
        ) : (
          <SyntaxHighlighter language="jsx" style={prism}>
            {`import React from 'react';
import ReactDOM from 'react-dom';
import { Tree, SampleTree, minimalTheme } from 'react-lazy-paginated-tree';

const TreeComponent = () => (
    <Tree
        nodes={SampleTree}
        useLocalState={true}
    />
);

const content = document.getElementById('content');
ReactDOM.render(<TreeComponent />, content);`}
          </SyntaxHighlighter>
        )}
        <h2>
          Minimal Theme
          <Code
            onClick={() => this.setState({ showCode2: !this.state.showCode2 })}
            style={{ float: 'right', fontSize: 40, cursor: 'pointer' }}
          />
        </h2>
        {!showCode2 ? (
          <Tree
            nodes={JSON.parse(JSON.stringify(SampleTree))}
            theme={minimalTheme}
          />
        ) : (
          <SyntaxHighlighter language="jsx" style={prism}>
            {`import React from 'react';
import ReactDOM from 'react-dom';
import { Tree, SampleTree, minimalTheme } from 'react-lazy-paginated-tree';

const TreeComponent = () => (
  <Tree
      nodes={SampleTree}
      theme={minimalTheme}
      useLocalState={true}
  />
);

const content = document.getElementById('content');
ReactDOM.render(<TreeComponent />, content);`}
          </SyntaxHighlighter>
        )}
        <h2>
          Lazy Loaded Nodes
          <Code
            onClick={() => this.setState({ showCode3: !this.state.showCode3 })}
            style={{ float: 'right', fontSize: 40, cursor: 'pointer' }}
          />
        </h2>
        {!showCode3 ? (
          <Tree nodes={LazySample} loadChildren={loadChildren} />
        ) : (
          <SyntaxHighlighter language="jsx" style={prism}>
            {`import React from 'react';
import ReactDOM from 'react-dom';
import { Tree, SampleTree, minimalTheme } from 'react-lazy-paginated-tree';

const TreeComponent = () => (
<Tree
    nodes={SampleTree}
    loadChildren={loadChildren}
    useLocalState={true}
/>
);

const content = document.getElementById('content');
ReactDOM.render(<TreeComponent />, content);`}
          </SyntaxHighlighter>
        )}
        <h2>
          Lazy Loaded Nodes and Pagination
          <Code
            onClick={() => this.setState({ showCode4: !this.state.showCode4 })}
            style={{ float: 'right', fontSize: 40, cursor: 'pointer' }}
          />
        </h2>
        {!showCode4 ? (
          <Tree
            nodes={JSON.parse(JSON.stringify(LazyPaginatedSample))}
            loadChildren={loadChildrenPaginated}
            pageLimit={800}
          />
        ) : (
          <SyntaxHighlighter language="jsx" style={prism}>
            {`import React from 'react';
import ReactDOM from 'react-dom';
import { Tree, SampleTree, minimalTheme } from 'react-lazy-paginated-tree';

const TreeComponent = () => (
<Tree
  nodes={SampleTree}
  loadChildren={loadChildrenPaginated}
  pageLimit={5}
  useLocalState={true}
/>
);

const content = document.getElementById('content');
ReactDOM.render(<TreeComponent />, content);`}
          </SyntaxHighlighter>
        )}
        <h2>
          Minimal Theme, Lazy Loaded Nodes and Pagination
          <Code
            onClick={() => this.setState({ showCode5: !this.state.showCode5 })}
            style={{ float: 'right', fontSize: 40, cursor: 'pointer' }}
          />
        </h2>
        {!showCode5 ? (
          <Tree
            nodes={JSON.parse(JSON.stringify(LazyPaginatedSample))}
            loadChildren={loadChildrenPaginated}
            pageLimit={800}
            theme={minimalTheme}
          />
        ) : (
          <SyntaxHighlighter language="jsx" style={prism}>
            {`import React from 'react';
import ReactDOM from 'react-dom';
import { Tree, SampleTree, minimalTheme } from 'react-lazy-paginated-tree';

const TreeComponent = () => (
<Tree
  nodes={SampleTree}
  loadChildren={loadChildrenPaginated}
  pageLimit={5}
  theme={minimalTheme}
  useLocalState={true}
/>
);

const content = document.getElementById('content');
ReactDOM.render(<TreeComponent />, content);`}
          </SyntaxHighlighter>
        )}
      </div>
    );
  }
}

export default App;
