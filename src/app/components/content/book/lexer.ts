import * as LexedModule from '../../../../assets/lib/lexed.js';

export class Lexer {

  constructor() {}

  rules = {

  '\\s+': function (text) {
   return {
    token: 'SPACE',
    value: text
   };
  },

  // tslint:disable-next-line:max-line-length
  'PROGRAM|DEFINE|IMPORT|TRY|CATCH|BEGIN|END|CALL|FOR|TO|STEP|WHILE|DO|WITH|SORT|USING|MERGE|INDEX|AS|OF|ARRAY|RETURN[S]*|VAR|IF|THEN|ELSE|AND|OR|NOT|NEW|COPYOF|DETACH|SIZEOF|CREATE|DELETE|TYPE|TYPENS|ISSET|ISNULL|ISTYPE|ISINSTANCE'
   : function (text) {
    return {
     token: 'SYMBOL',
     value: text
    };
   },

  'TRUE|FALSE|NULL': function (text) {
   return {
    token: 'CONST',
    value: text
   };
  },

  '[0-9]+(\.[0-9]+)*': function (text) {
   return {
    token: 'NUMBER',
    value: text
   };
  },

  '".*"': function (text) {
   return {
    token: 'STRING',
    value: text
   };
  },

  '[a-zA-Z][a-zA-Z0-9]*(::)*': function (text) {
   return {
    token: 'IDENTIFIER',
    value: text
   };
  },

  '[\(\)]': function (text) {
   return {
    token: 'PARENTHES',
    value: text
   };
  },

  '[\\[\\]]': function (text) {
   return {
    token: 'SQPARENTHES',
    value: text
   };
  },

  '[\+=<>]': function (text) {
   return {
    token: 'RELATION',
    value: text
   };
  },

  ':': function (text) {
   return {
    token: 'DOUBLECOLON',
    value: text
   };
  },


  '[;\.]': function (text) {
   return {
    token: 'SEMICOLONANDDOT',
    value: text
   };
  },

  '.': LexedModule.Lexed.IGNORE
 };

  public links = {
  mkTypeLink: function (t, ns) {
   return '/type;type=' + t + ';ns=' + encodeURIComponent(ns);
  },
  mkProgramLink: function (p) {
   return '/program;name=' + p; // encodeURIComponent(p);
  }
 };

 applyTemplate(t, v) {
  // return v;
  return '<span class="ias-ys-' + t.toLowerCase() + '">' + v + '</span>';
 }

 YScript2HTML(s) {

 const l = new LexedModule.Lexed(s, this.rules);

 let token;
 let r = '';

 let state = 'any';
 let current = '';
 try {

  while ((token = l.lex()) !== LexedModule.Lexed.EOF) {
   // console.log(state, token);

   if (state === 'IDENTIFIER') {

    if (token.token === 'IDENTIFIER' || token.value === '.') {

     current = current + token.value;

    } else if (token.token === 'PARENTHES' && token.value === '(') {

     r = r + this.applyTemplate('PROGRAM', current);
     r = r + this.applyTemplate(token.token, token.value);

     state = 'any';

    } else if (token.token === 'DOUBLECOLON' && token.value === ':') {

     let ns;
     while ((ns = l.lex()) !== LexedModule.Lexed.EOF && ns.token === 'SPACE') {
      /* */
     }

     if (ns.token === undefined || ns.token !== 'STRING') {
      throw { msg: 'Expected type NS' };
     }


     r = r + this.applyTemplate('TYPE', current) + ' : ';
     r = r + this.applyTemplate('NS', ns.value);


     state = 'any';

    } else {

     r = r + this.applyTemplate('IDENTIFIER', current);
     // r = r + ' ';
     // if(token.token != 'SPACE')
     r = r + this.applyTemplate(token.token, token.value);
     // console.log('current=', current);
     state = 'any';
    }

   } else {


    if (token.token === 'IDENTIFIER') {
     current = token.value;
     state = 'IDENTIFIER';
    } else {
     r = r + this.applyTemplate(token.token, token.value);
    }

   }
  }

 } catch (e) {
  if (e.msg !== undefined) {
   console.log('LEXER ERROR: ' + e.msg);
  } else {
   console.log('GENERAL ERROR: ' + e);
  }
 }

// console.log(r);
 return r;
}

dirtyHackIAScript(content: string) {
  let result = '';
  let index = 0;
  let lastIndex = 0;
  // console.log(index);
  while ((index = content.indexOf('<pre><code class="app-ias-script">', index)) !== -1) {
    // console.log(index);
    result += content.substr(lastIndex, index - lastIndex);
    const index2 = content.indexOf('</code>', index + 1);
    if (index2 !== -1) {
      index += 34;
      // index2 += 7;
      // console.log(content.substr(index, index2 - index));
      result += '<pre><code class="app-ias-script">'
        + this.YScript2HTML(content.substr(index, index2 - index) + ' ') + '</code></pre>';
      index = lastIndex = index2 + 13;
    }
  }

  result += content.substr(lastIndex);

  // console.log(result);

  return result;
}

}
