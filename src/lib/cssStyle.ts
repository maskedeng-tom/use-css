// https://developer.mozilla.org/ja/docs/Web/CSS

declare const nominalString: unique symbol;
type CSSString = string & { [nominalString]?: never };

declare const nominalNumber: unique symbol;
type CSSNumber = number & { [nominalNumber]?: never };

type CSSColor = 'aqua'|'black'|'blue'|'fuchsia'|'gray'|'grey'|'green'|'lime'|'maroon'|'navy'|'olive'|'purple'|'red'|'silver'|'teal'|'white'|'yellow'|CSSString;

type CSSBorderWidth = 'thin'|'medium'|'thick'|CSSString|CSSNumber;
type CSSBorderColor = 'transparent'|CSSColor;
type CSSBorderStyle = 'none'|'hidden'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'dotted'|'dashed'|CSSString;

type CSS1ListStyle = 'none'|'disc'|'circle'|'square'|'decimal'|'upper-alpha'|'lower-alpha'|'upper-roman'|'lower-roman'|CSSString;
type CSS2ListStyle = 'decimal-leading-zero'|'lower-greek'|'upper-latin'|'lower-latin'|'hebrew'|'armenian'|'georgian'|'cjk-ideographic'|'hiragana'|'katakana'|'hiragana-iroha'|'katakana-iroha'|CSSString;
type CSSListStyle = CSS1ListStyle | CSS2ListStyle;

type CSSBackgroundSize = 'auto'|'contain'|'cover'|CSSString|CSSNumber;

interface CSSStyle {
  //
  'font'?: CSSString;
  'fontSize'?: 'xx-small'|'x-small'|'small'|'medium'|'large'|'x-large'|'xx-large'|'smaller'|'larger'|CSSString|CSSNumber;
  'fontWeight'?: 'normal'|'bold'|'lighter'|'bolder'|100|200|300|400|500|600|700|800|900|CSSNumber|CSSString;
  'fontStyle'?: 'normal'|'italic'|'oblique'|CSSString;
  'fontFamily'?: CSSString;
  'fontVariant'?: 'normal'|'small-caps'|CSSString;
  //
  'textAlign'?: 'left'|'center'|'right'|'justify'|CSSString;
  'verticalAlign'?: 'baseline'|'top'|'middle'|'bottom'|'text-top'|'text-bottom'|'super'|'sub'|CSSString|CSSNumber;
  'lineHeight'?: 'normal'|CSSString|CSSNumber;
  'lineBreak'?: 'auto'|'loose'|'normal'|'strict'|CSSString;
  'textDecoration'?: 'none'|'underline'|'overline'|'line-through'|'blink'|CSSString;
  'textIndent'?: CSSString|CSSNumber;
  'textTransform'?: 'none'|'capitalize'|'uppercase'|'lowercase'|CSSString|CSSNumber;
  'letterSpacing'?: 'normal'|CSSString|CSSNumber;
  'wordSpacing'?: 'normal'|CSSString|CSSNumber;
  'whiteSpace'?: 'normal'|'nowrap'|'pre'|CSSString|CSSNumber;
  'color'?: CSSColor;
  'opacity'?: CSSNumber;
  'overflowWrap'?: 'normal'|'break-word'|CSSString;
  'textJustify'?: 'auto'|'inter-word'|'inter-ideograph'|'inter-cluster'|'distribute'|'kashida'|'none'|CSSString;
  'wordBreak'?: 'normal'|'keep-all'|'break-all'|CSSString;
  'pointerEvents'?: 'auto'|'none'|'inherit'|'initial'|'unset'|CSSString;
  //
  'background'?: CSSString|[CSSStyle['backgroundColor'],CSSStyle['backgroundImage'],CSSStyle['backgroundRepeat'],CSSStyle['backgroundPosition'],CSSStyle['backgroundAttachment']];
  'backgroundColor'?: 'transparent'|CSSColor,
  'backgroundImage'?: 'none'|CSSString;
  'backgroundRepeat'?: 'repeat'|'repeat-x'|'repeat-y'|'no-repeat'|CSSString;
  'backgroundPosition'?: 'left'|'center'|'right'|'top'|'bottom'|CSSString;
  'backgroundAttachment'?: 'scroll'|'local'|'fixed'|CSSString;
  'backgroundClip'?: 'border-box'|'padding-box'|'content-box'|CSSString;
  'backgroundOrigin'?: 'border-box'|'padding-box'|'content-box'|CSSString;
  'backgroundSize'?: CSSBackgroundSize|[CSSBackgroundSize,CSSBackgroundSize];
  //
  'width'?: 'auto'|CSSString|CSSNumber;
  'height'?: 'auto'|CSSString|CSSNumber;
  'maxWidth'?: 'none'|CSSString|CSSNumber;
  'minWidth'?: CSSString|CSSNumber;
  'maxHeight'?: 'none'|CSSString|CSSNumber;
  'minHeight'?: CSSString|CSSNumber;
  //
  'margin'?: CSSString |
    ['auto'|CSSString|CSSNumber,'auto'|CSSString|CSSNumber] |
    ['auto'|CSSString|CSSNumber,'auto'|CSSString|CSSNumber,'auto'|CSSString|CSSNumber,'auto'|CSSString|CSSNumber];
  'marginTop'?: 'auto'|CSSString|CSSNumber;
  'marginRight'?: 'auto'|CSSString|CSSNumber;
  'marginBottom'?: 'auto'|CSSString|CSSNumber;
  'marginLeft'?: 'auto'|CSSString|CSSNumber;
  //
  'padding'?: CSSString|
    ['auto'|CSSString|CSSNumber,'auto'|CSSString|CSSNumber] |
    ['auto'|CSSString|CSSNumber,'auto'|CSSString|CSSNumber,'auto'|CSSString|CSSNumber,'auto'|CSSString|CSSNumber];
  'paddingTop'?: CSSString|CSSNumber;
  'paddingRight'?: CSSString|CSSNumber;
  'paddingBottom'?: CSSString|CSSNumber;
  'paddingLeft'?: CSSString|CSSNumber;
  //
  'border'?: CSSString|[CSSBorderWidth, CSSBorderStyle, CSSBorderColor];
  'borderTop'?: CSSString|[CSSBorderWidth, CSSBorderStyle, CSSBorderColor];
  'borderRight'?: CSSString|[CSSBorderWidth, CSSBorderStyle, CSSBorderColor];
  'borderBottom'?: CSSString|[CSSBorderWidth, CSSBorderStyle, CSSBorderColor];
  'borderLeft'?: CSSString|[CSSBorderWidth, CSSBorderStyle, CSSBorderColor];
  'borderWidth'?: CSSString;
  'borderTopWidth'?: CSSBorderWidth;
  'borderRightWidth'?: CSSBorderWidth;
  'borderBottomWidth'?: CSSBorderWidth;
  'borderLeftWidth'?: CSSBorderWidth;
  'borderColor'?: CSSBorderColor;
  'borderTopColor'?: CSSBorderColor;
  'borderRightColor'?: CSSBorderColor;
  'borderBottomColor'?: CSSBorderColor;
  'borderLeftColor'?: CSSBorderColor;
  'borderStyle'?: CSSBorderStyle;
  'borderTopStyle'?: CSSBorderStyle;
  'borderRightStyle'?: CSSString;
  'borderBottomStyle'?: CSSBorderStyle;
  'borderLeftStyle'?: CSSBorderStyle;

  'borderRadius'?: CSSString|CSSNumber|[CSSString|CSSNumber,CSSString|CSSNumber]|[CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber];
  'borderTopLeftRadius'?: CSSString|CSSNumber;
  'borderTopRightRadius'?: CSSString|CSSNumber;
  'borderBottomLeftRadius'?: CSSString|CSSNumber;
  'borderBottomRightRadius'?: CSSString|CSSNumber;
  //
  'boxDecorationBreak'?: 'slice'|'clone'|CSSString;
  'boxShadow'?: CSSString|CSSNumber|
    [CSSString|CSSNumber,CSSString|CSSNumber]|
    [CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber]|
    [CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber]|
    [CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSColor|CSSString]|
    [CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSColor|CSSString,'inset'|'none'|CSSString]|
    [CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSColor|CSSString,CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSString|CSSNumber,CSSColor|CSSString];
  //
  'overflow'?: 'visible'|'hidden'|'scroll'|'auto'|CSSString;
  'overflowStyle'?: 'auto'|'scrollbar'|'panner'|'move'|'marquee'|CSSString;
  'overflowX'?: 'visible'|'hidden'|'scroll'|'auto'|CSSString;
  'overflowY'?: 'visible'|'hidden'|'scroll'|'auto'|CSSString;

  'display'?: 'inline'|'inline-block'|'block'|'list-item'|'run-in'|'compact'|'none'|'grid'|CSSString;
  'visibility'?: 'visible'|'hidden'|'collapse'|CSSString;
  'clip'?: 'auto'|CSSString|CSSNumber;
  'float'?: 'none'|'left'|'right'|CSSString;
  'clear'?: 'none'|'left'|'right'|'both'|CSSString;
  'position'?: 'static'|'relative'|'absolute'|'fixed'|CSSString;
  //
  'top'?: 'auto'|CSSString|CSSNumber;
  'right'?: 'auto'|CSSString|CSSNumber;
  'bottom'?: 'auto'|CSSString|CSSNumber;
  'left'?: 'auto'|CSSString|CSSNumber;
  //
  'zIndex'?: 'auto'|CSSString|CSSNumber;
  'direction'?: 'ltr'|'rtl'|CSSString;
  'unicodeBidi'?: 'normal'|'embed'|'bidi-override'|CSSString;
  //
  'listStyle'?: CSSString|[CSSListStyle,'outside'|'inside'|CSSString,'none'|CSSString];
  'listStyleType'?: CSSListStyle;
  'listStylePosition'?: 'outside'|'inside'|CSSString;
  'listStyleImage'?: 'none'|CSSString;
  //
  'tableLayout'?: 'auto'|'fixed'|CSSString;
  'borderCollapse'?: 'collapse'|'separate'|CSSString;
  'borderSpacing'?: CSSString|CSSNumber;
  'emptyCells'?: 'show'|'hide'|CSSString;
  'captionSide'?: 'top'|'bottom'|'left'|'right'|CSSString;
  //
  'content'?: 'open-quote'|'close-quote'|'no-open-quote'|'no-close-quote'|CSSString;
  'quotes'?: 'none'|CSSString;
  //
  'outline'?: CSSString|[CSSStyle['outlineWidth'],CSSStyle['outlineColor'],CSSStyle['outlineStyle'],];
  'outlineWidth'?: 'thin'|'medium'|'thick'|CSSString;
  'outlineColor'?: 'invert'|CSSColor;
  'outlineStyle'?: 'none'|'solid'|'double'|'groove'|'ridge'|'inset'|'outset'|'dotted'|'dashed'|CSSString;
  //
  'cursor'?: 'auto'|'default'|'pointer'|'crosshair'|'move'|'text'|'wait'|'help'|'n-resize'|'e-resize'|'s-resize'|'w-resize'|'ne-resize'|'se-resize'|'sw-resize'|'nw-resize'|CSSString;
  'boxSizing'?: 'content-box'|'padding-box'|'border-box'|'inherit'|CSSString;
  'resize'?: 'none'|'both'|'horizontal'|'vertical'|'inherit'|CSSString;
  'textOverflow'?: 'clip'|'ellipsis'|CSSString;
  //
  'pageBreakBefore'?: 'auto'|'always'|'avoid'|'left'|'right'|CSSString;
  'pageBreakAfter'?: 'auto'|'always'|'avoid'|'left'|'right'|CSSString;
  'pageBreakInside'?: 'auto'|'avoid'|CSSString;

  // Flex box
  'alignContent'?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'|CSSString;
  'alignItems'?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'|CSSString;
  'alignSelf'?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'|CSSString;
  'flex'?: CSSString|[],
  'flexBasis'?: 'auto'|CSSString|CSSNumber,
  'flexDirection'?: 'row'|'row-reverse'|'column'|'column-reverse'|CSSString,
  'flexFlow'?: CSSString|[CSSStyle['flexDirection'],CSSStyle['flexWrap']],
  'flexGrow'?: CSSString|CSSNumber,
  'flexShrink'?: CSSString|CSSNumber,
  'flexWrap'?: 'nowrap'|'wrap'|'wrap-reverse'|CSSString,
  'justifyContent'?: 'flex-start'|'flex-end'|'center'|'space-between'|'space-around'|CSSString,
  'order'?: CSSString|CSSNumber,

  // gird
  'grid'?: CSSString,
  'gridArea'?: CSSString,
  'gridAutoColumns'?: 'min-content'|'max-content'|'auto'|'inherit'|'initial'|'revert'|'unset'|CSSString,
  'gridAutoFlow'?: 'row'|'column'|'dense'|'row dense'|'column dense'|'inherit'|'initial'|'revert'|'unset'|CSSString,
  'gridAutoRows'?: 'min-content'|'max-content'|'auto'|'inherit'|'initial'|'revert'|'unset'|CSSString,
  'gridColumn'?: CSSString|CSSNumber,
  'gridColumnEnd'?: 'auto'|'inherit'|'initial'|'revert'|'unset'|CSSString|CSSNumber,
  'gridColumnStart'?: 'auto'|'inherit'|'initial'|'revert'|'unset'|CSSString|CSSNumber,
  'gridRow'?: CSSString|CSSNumber,
  'gridRowEnd'?: 'auto'|'inherit'|'initial'|'revert'|'unset'|CSSString|CSSNumber,
  'gridRowStart'?: 'auto'|'inherit'|'initial'|'revert'|'unset'|CSSString|CSSNumber,
  'gridTemplate'?: CSSString,
  'gridTemplateAreas'?: CSSString,
  'gridTemplateColumns'?: 'none'|'inherit'|'initial'|'revert'|'unset'|CSSString,
  'gridTemplateRows'?: 'none'|'inherit'|'initial'|'revert'|'unset'|CSSString,

}

/*

トランジション（CSS Transitions）	▲TOP
transition CSS3
transition-delay CSS3
transition-duration CSS3
transition-property CSS3
transition-timing-function CSS3

アニメーション（CSS Animations）	▲TOP
animation CSS3
animation-delay CSS3
animation-direction CSS3
animation-duration CSS3
animation-fill-mode CSS3
animation-iteration-count CSS3
animation-name CSS3
animation-play-state CSS3
animation-timing-function CSS3
*/

const ignorePixelStyle = [
  'boxFlex',
  'boxFlexGroup',
  'columnCount',
  'fillOpacity',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'strokeOpacity',
  'widows',
  'zIndex',
  'zoom',
  //
  'gridColumn',
  'gridColumnEnd',
  'gridColumnStart',
  'gridRow',
  'gridRowEnd',
  'gridRowStart',
];


// スタイル 定義
type SassStyles = CSSStyle | {[key:string]: SassStyles | string | number | undefined | null | (string | number)[]};

export { type CSSStyle, type SassStyles, ignorePixelStyle };
