import page from './pages';

let env = '';
if (process.env.TIME) {
  env = process.env.TIME;
}

function init() {
  page();
}

init(env);

export default init;
