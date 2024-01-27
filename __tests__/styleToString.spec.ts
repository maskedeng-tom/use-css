/**
 * @jest-environment node
**/

import { styleToString } from '../src/lib/styleToString';

describe('styleToString', () => {
  test('basic', () => {

    expect(styleToString({
      color: 'aqua',
      opacity: 1,
      borderBottom: 3,
    })).toBe('color:aqua;opacity:1;border-bottom:3px;');

    expect(styleToString({
      border: [1, 'solid', 'red'],
    })).toBe('border:1px solid red;');

  });

  test('basic w class', () => {

    expect(styleToString({
      '.test':{
        color: 'aqua',
      }
    })).toBe('.test{color:aqua;}');

    expect(styleToString({
      '.test':{
        '.sample':{
          color: 'aqua',
        }
      }
    })).toBe('.test .sample{color:aqua;}');

  });

  test('basic w &', () => {

    expect(styleToString({
      '.test':{
        '&.sample':{
          color: 'aqua',
        }
      }
    })).toBe('.test.sample{color:aqua;}');

  });

  test('basic mix', () => {

    expect(styleToString({
      color: 'green',
      '.test':{
        color: 'aqua',
      }
    })).toBe('color:green;.test{color:aqua;}');

    expect(styleToString({
      '.test':{
        opacity: 1.0,
        '.sample':{
          color: 'aqua',
        }
      }
    })).toBe('.test{opacity:1;}.test .sample{color:aqua;}');

  });

  test('basic multi selector', () => {

    expect(styleToString({
      color: 'green',
      '.test, .test1':{
        color: 'aqua',
      }
    })).toBe('color:green;.test{color:aqua;}.test1{color:aqua;}');

    expect(styleToString({
      '.test':{
        opacity: 1.0,
        '.sample, .sample2':{
          color: 'aqua',
        }
      }
    })).toBe('.test{opacity:1;}.test .sample{color:aqua;}.test .sample2{color:aqua;}');

  });

  test('basic rule', () => {

    expect(styleToString({
      '@media print':{
        body:{
          fontSize: '12pt',
        }
      }
    })).toBe('@media print{body{font-size:12pt;}}');

    expect(styleToString({
      '@media print':{
        body:{
          fontSize: '12pt',
        }
      },
      '@media screen':{
        body:{
          fontSize: '10pt',
        }
      }
    })).toBe('@media print{body{font-size:12pt;}}@media screen{body{font-size:10pt;}}');

    expect(styleToString({
      '@media print':{
        body:{
          fontSize: '12pt',
        }
      },
      color: 'blue',
      '@media screen':{
        body:{
          fontSize: '10pt',
        }
      }
    })).toBe('@media print{body{font-size:12pt;}}color:blue;@media screen{body{font-size:10pt;}}');

  });

  test('basic simple rule', () => {

    expect(styleToString({
      '@import url layer':{}
    })).toBe('@import url layer;');

    expect(styleToString({
      '@charset "UTF-8"':{}
    })).toBe('@charset "UTF-8";');

    expect(styleToString({
      '@keyframes slide-in':{
        from:{
          transform: 'translateX(0%)',
        },
        to: {
          transform: 'translateX(100%)',
        }
      }
    })).toBe('@keyframes slide-in{from{transform:translateX(0%);}to{transform:translateX(100%);}}');

  });

  test('basic w v-deep', () => {

    expect(styleToString({
      '.test .test2 .test3':{
        color: 'aqua',
      }
    })).toBe('.test .test2 .test3{color:aqua;}');

    expect(styleToString({
      '::v-deep':{
        color: 'aqua',
      }
    }, 'xxx')).toBe('[xxx]{color:aqua;}');

    expect(styleToString({
      '.test .test2 .test3':{
        color: 'aqua',
      }
    }, 'xxx')).toBe('.test .test2 .test3[xxx]{color:aqua;}');

    expect(styleToString({
      '::v-deep .test .test2 .test3':{
        color: 'aqua',
      }
    }, 'xxx')).toBe('[xxx] .test .test2 .test3{color:aqua;}');

    expect(styleToString({
      '.test ::v-deep .test2 .test3':{
        color: 'aqua',
      }
    }, 'xxx')).toBe('.test[xxx] .test2 .test3{color:aqua;}');

    expect(styleToString({
      '.test .test2 ::v-deep .test3':{
        color: 'aqua',
      }
    }, 'xxx')).toBe('.test .test2[xxx] .test3{color:aqua;}');

    expect(styleToString({
      '.test .test2 .test3 ::v-deep':{
        color: 'aqua',
      }
    }, 'xxx')).toBe('.test .test2 .test3[xxx]{color:aqua;}');

    expect(styleToString({
      '.test:first-child':{
        color: 'aqua',
      }
    }, 'xxx')).toBe('.test[xxx]:first-child{color:aqua;}');

    expect(styleToString({
      '.test::href':{
        color: 'aqua',
      }
    }, 'xxx')).toBe('.test[xxx]::href{color:aqua;}');

  });

  test('pretty', () => {

    expect(styleToString({
      color: 'aqua',
      opacity: 1,
      borderBottom: 3,
    }, undefined, true)).toBe(
      `color:aqua;
opacity:1;
border-bottom:3px;
`);

    expect(styleToString({
      color: 'green',
      '.test':{
        color: 'aqua',
      }
    }, undefined, true)).toBe(`color:green;
.test{
  color:aqua;
}
`);

    expect(styleToString({
      '@media print':{
        body:{
          fontSize: '12pt',
        }
      }
    }, undefined, true)).toBe(`@media print{
  body{
    font-size:12pt;
  }
}
`);

    expect(styleToString({
      '@charset "UTF-8"':{}
    }, undefined, true)).toBe(`@charset "UTF-8";
`);


  });


});
