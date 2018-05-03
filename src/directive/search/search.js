// import './waves.css';

export default{
  bind(el, binding) {
    el.addEventListener('click', e => {
      binding.arg();
    }, false);

  }
}

