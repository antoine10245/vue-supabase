'use strict';
const { isVue3, inject } = require('vue-demi');

const { createClient } = require('@supabase/supabase-js')

const supabaseSymbol = Symbol('supabase');

function useSupabase() { 
  return inject(supabaseSymbol);
}

function install(app, options) {
  const supabase = createClient(options.supabaseUrl, options.supabaseKey, options.supabaseOptions)

  if (isVue3){
    app.config.globalProperties.$supabase = supabase;
    app.provide(supabaseSymbol, supabase);
  } else {
    Object.defineProperties(app.prototype, {
      $supabase: {
        get: function() {
          return supabase;
        },
      },
    });
    app.supabase = supabase;
  }
}

exports.install = install;
exports.useSupabase = useSupabase;
