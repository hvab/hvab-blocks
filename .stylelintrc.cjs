// Копия dotfiles25/stylelint.js (base) + проектные override. Не зависимость.
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  rules: {
    'selector-class-pattern': null, // пресет: БЭМ с _ / __
    'media-feature-range-notation': 'prefix', // пресет
    'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'], // пресет
    'custom-property-pattern': null, // ПРОЕКТ: приватные --_block-* стартуют с _
    'no-descending-specificity': null, // ПРОЕКТ: чейнинг модификаторов/состояний (§3.3)
  },
};
