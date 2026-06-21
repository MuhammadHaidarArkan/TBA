var e = (e, t) => () => (e && (t = e(e = 0)),
t)
  , t = (e, t) => () => (t || (e((t = {
    exports: {}
}).exports, t),
e = null),
t.exports);
(function() {
    let e = document.createElement(`link`).relList;
    if (e && e.supports && e.supports(`modulepreload`))
        return;
    for (let e of document.querySelectorAll(`link[rel="modulepreload"]`))
        n(e);
    new MutationObserver(e => {
        for (let t of e)
            if (t.type === `childList`)
                for (let e of t.addedNodes)
                    e.tagName === `LINK` && e.rel === `modulepreload` && n(e)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function t(e) {
        let t = {};
        return e.integrity && (t.integrity = e.integrity),
        e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
        e.crossOrigin === `use-credentials` ? t.credentials = `include` : e.crossOrigin === `anonymous` ? t.credentials = `omit` : t.credentials = `same-origin`,
        t
    }
    function n(e) {
        if (e.ep)
            return;
        e.ep = !0;
        let n = t(e);
        fetch(e.href, n)
    }
}
)();
var n, r = e(( () => {
    n = {
        getCorrectAnswers(e) {
            let t = {};
            return e.states.forEach(n => {
                let r = [];
                e.start === n && e.final.includes(n) && r.push(`ε`),
                e.transitions.filter(e => e.from === n).forEach(t => {
                    t.label.split(`,`).map(e => e.trim()).filter(e => e !== ``).forEach(n => {
                        n === `ε` ? (r.push(`${t.to}`),
                        e.final.includes(t.to) && r.push(`ε`)) : (r.push(`${n} ${t.to}`),
                        e.final.includes(t.to) && r.push(`${n}`))
                    }
                    )
                }
                ),
                t[n] = [...new Set(r)].sort()
            }
            ),
            t
        },
        generateRandom(e) {
            let t = e.length;
            if (t === 0)
                return {
                    alphabet: [],
                    final: [],
                    transitions: []
                };
            let n = Math.floor(Math.random() * t) + 1
              , r = `abcdefghijklmnopqrstuvwxyz`.split(``).slice(0, n)
              , i = [...e].sort( () => .5 - Math.random())
              , a = Math.max(1, Math.floor(Math.random() * Math.min(3, t)))
              , o = i.slice(0, a)
              , s = t
              , c = Math.max(t + 2, Math.floor(t * n * 1.5))
              , l = Math.floor(Math.random() * (c - s + 1)) + s
              , u = [];
            for (let n = 0; n < t - 1; n++)
                u.push({
                    from: e[n],
                    to: e[n + 1],
                    label: r[Math.floor(Math.random() * r.length)]
                });
            let d = l - (t - 1);
            for (let n = 0; n < d; n++)
                u.push({
                    from: e[Math.floor(Math.random() * t)],
                    to: e[Math.floor(Math.random() * t)],
                    label: r[Math.floor(Math.random() * r.length)]
                });
            return u = u.filter( (e, t, n) => n.findIndex(t => t.from === e.from && t.to === e.to && t.label === e.label) === t),
            {
                alphabet: r,
                final: o,
                transitions: u
            }
        }
    }
}
));
function i() {
    let e = a({
        states: [`q0`, `q1`, `q2`],
        alphabet: [`a`, `b`],
        start: `q0`,
        final: [`q2`],
        transitions: [{
            from: `q0`,
            to: `q1`,
            label: `a`
        }, {
            from: `q1`,
            to: `q2`,
            label: `b`
        }, {
            from: `q0`,
            to: `q0`,
            label: `b`
        }, {
            from: `q2`,
            to: `q2`,
            label: `a`
        }, {
            from: `q1`,
            to: `q1`,
            label: `a`
        }]
    })
      , t = o( () => n.getCorrectAnswers(e.value))
      , r = o( () => {
        let t = {}
          , n = 65;
        return e.value.states.forEach(r => {
            r === e.value.start ? t[r] = `S` : (n === 83 && n++,
            t[r] = String.fromCharCode(n++))
        }
        ),
        t
    }
    );
    return {
        fsa: e,
        correctAnswers: t,
        stateMapping: r,
        formalCorrectAnswers: o( () => {
            let n = {}
              , i = r.value;
            return e.value.states.forEach(e => {
                let r = [];
                t.value[e].forEach(e => {
                    if (e === `ε`)
                        r.push(`ε`);
                    else {
                        let t = e.split(` `);
                        t.length === 2 ? r.push(`${t[0]}${i[t[1]]}`) : t.length === 1 && (i[t[0]] ? r.push(`${i[t[0]]}`) : r.push(`${t[0]}`))
                    }
                }
                ),
                n[e] = r
            }
            ),
            n
        }
        ),
        fsaExplanations: o( () => {
            let t = {}
              , n = r.value;
            return e.value.states.forEach(r => {
                let i = []
                  , a = e.value.start === r
                  , o = e.value.final.includes(r)
                  , s = n[r];
                a && o && i.push(`Karena <b>${r}</b> adalah State Awal sekaligus State Akhir, tambahkan aturan produksi kosong: <code class="font-bold text-purple-700 bg-purple-100 px-1.5 rounded">${s} &rarr; &epsilon;</code>`);
                let c = e.value.transitions.filter(e => e.from === r);
                if (c.length === 0)
                    (!a || !o) && i.push(`State <b>${r}</b> tidak memiliki transisi (jalur panah) yang mengarah keluar.`);
                else {
                    let t = {};
                    c.forEach(e => {
                        let n = e.label.split(`,`).map(e => e.trim()).filter(e => e !== ``);
                        t[e.to] || (t[e.to] = new Set),
                        n.forEach(n => t[e.to].add(n))
                    }
                    );
                    for (let r in t) {
                        let a = Array.from(t[r]).sort()
                          , o = n[r]
                          , c = e.value.final.includes(r)
                          , l = a.map(e => e === `ε` ? `${s} &rarr; ${o}` : `${s} &rarr; ${e}${o}`).join(` | `)
                          , u = `Terdapat transisi ${a.map(e => e === `ε` ? `<b>&epsilon; (Epsilon Move)</b>` : `input <b>'${e}'</b>`).join(` atau `)} menuju state <b>${r}</b> (Variabel <b>${o}</b>). Menghasilkan aturan: <code class="font-bold text-purple-700 bg-purple-100 px-1.5 rounded">${l}</code>.`;
                        if (c) {
                            let e = a.map(e => e === `ε` ? `${s} &rarr; &epsilon;` : `${s} &rarr; ${e}`).join(` | `);
                            u += `<br>Karena <b>${r}</b> juga merupakan Final State, tambahkan pula aturan terminalnya: <code class="font-bold text-purple-700 bg-purple-100 px-1.5 rounded">${e}</code>.`
                        }
                        i.push(u)
                    }
                }
                t[r] = i
            }
            ),
            t
        }
        ),
        randomizeFSA: () => {
            let t = n.generateRandom(e.value.states);
            e.value.alphabet = t.alphabet,
            e.value.final = t.final,
            e.value.transitions = t.transitions
        }
        ,
        addState: () => {
            let t = 0;
            for (; e.value.states.includes(`q${t}`); )
                t++;
            e.value.states.push(`q${t}`)
        }
        ,
        removeState: t => {
            e.value.states.length <= 1 || (e.value.states = e.value.states.filter(e => e !== t),
            e.value.start === t && (e.value.start = e.value.states[0]),
            e.value.final = e.value.final.filter(e => e !== t),
            e.value.transitions = e.value.transitions.filter(e => e.from !== t && e.to !== t))
        }
        ,
        addTransition: () => {
            e.value.states.length > 0 && e.value.transitions.push({
                from: e.value.states[0],
                to: e.value.states[0],
                label: e.value.alphabet[0] || `a`
            })
        }
        ,
        removeTransition: t => {
            e.value.transitions.splice(t, 1)
        }
        ,
        insertEpsilonTransition: t => {
            let n = e.value.transitions[t].label || ``;
            n.length > 0 && !n.endsWith(`,`) && !n.endsWith(` `) && (n += `, `),
            e.value.transitions[t].label = n + `ε`
        }
        ,
        loadPreset: t => {
            t === `lat9-1` ? e.value = {
                states: [`q0`, `q1`, `q2`],
                alphabet: [`a`, `b`, `ε`],
                start: `q0`,
                final: [`q2`],
                transitions: [{
                    from: `q0`,
                    to: `q0`,
                    label: `a`
                }, {
                    from: `q0`,
                    to: `q1`,
                    label: `ε`
                }, {
                    from: `q1`,
                    to: `q2`,
                    label: `b`
                }, {
                    from: `q2`,
                    to: `q1`,
                    label: `a`
                }]
            } : t === `lat9-2` && (e.value = {
                states: [`q0`, `q1`, `q2`, `q3`],
                alphabet: [`a`, `b`],
                start: `q0`,
                final: [`q0`, `q2`],
                transitions: [{
                    from: `q0`,
                    to: `q0`,
                    label: `a`
                }, {
                    from: `q0`,
                    to: `q1`,
                    label: `a`
                }, {
                    from: `q1`,
                    to: `q2`,
                    label: `b`
                }, {
                    from: `q2`,
                    to: `q2`,
                    label: `b`
                }, {
                    from: `q2`,
                    to: `q3`,
                    label: `a`
                }]
            })
        }
    }
}
var a, o, s = e(( () => {
    r(),
    {ref: a, computed: o} = window.Vue
}
)), c, l = e(( () => {
    c = {
        cloneGrammar(e) {
            let t = {};
            for (let n in e)
                t[n] = [...e[n]];
            return t
        },
        isVariable(e) {
            return /^[A-Z]$/.test(e)
        },
        removeEpsilon(e) {
            let t = this.cloneGrammar(e)
              , n = new Set
              , r = !0
              , i = [];
            for (; r; ) {
                r = !1;
                for (let e in t)
                    if (!n.has(e)) {
                        for (let i of t[e])
                            if (i === `ε` || i.split(``).every(e => n.has(e))) {
                                n.add(e),
                                r = !0;
                                break
                            }
                    }
            }
            n.size > 0 ? (i.push(`<b>Langkah 1: Menentukan Variabel Nullable</b>`),
            i.push(`Variabel <i>nullable</i> adalah variabel yang dapat menghasilkan &epsilon; (secara langsung maupun terselubung).<br>Ditemukan himpunan variabel <i>nullable</i>: { <b>${Array.from(n).join(`, `)}</b> }`),
            i.push(`<br><b>Langkah 2: Menjabarkan Kombinasi dan Menghapus &epsilon; Murni</b>`),
            i.push(`Setiap aturan yang mengandung variabel <i>nullable</i> dijabarkan seluruh kombinasinya, kemudian aturan tunggal &epsilon; dihapus.`)) : i.push(`Tidak ditemukan variabel <i>nullable</i> maupun produksi kosong (&epsilon;). Tata bahasa tidak mengalami perubahan pada tahap ini.`);
            let a = {};
            for (let e in t) {
                a[e] = new Set;
                for (let r of t[e])
                    if (r !== `ε`) {
                        let t = [``];
                        for (let e of r) {
                            let r = [];
                            for (let i of t)
                                r.push(i + e),
                                n.has(e) && r.push(i);
                            t = r
                        }
                        t.filter(e => e !== ``).forEach(t => a[e].add(t))
                    }
            }
            let o = {};
            for (let e in a) {
                let n = Array.from(a[e]).sort()
                  , r = t[e].join(` | `)
                  , s = n.join(` | `) || `&empty;`;
                r !== s && i.push(`&bull; <b>Variabel ${e}</b>: Aturan awal <code class="text-blue-700 bg-blue-50 px-1 rounded">${e} &rarr; ${r}</code> disesuaikan menjadi <code class="text-emerald-700 bg-emerald-50 px-1 rounded font-bold">${e} &rarr; ${s}</code>.`),
                o[e] = n
            }
            return {
                grammar: o,
                desc: n.size > 0 ? `Menjabarkan seluruh kombinasi produksi dari himpunan variabel <i>nullable</i> <b>{ ${Array.from(n).join(`, `)} }</b> dan menghapus produksi &epsilon; murni.` : `Aman, tidak ada produksi &epsilon;.`,
                details: i
            }
        },
        removeUnit(e) {
            let t = this.cloneGrammar(e)
              , n = {}
              , r = Object.keys(t)
              , i = [];
            r.forEach(e => {
                n[e] = new Set([e])
            }
            );
            let a = !0;
            for (; a; )
                a = !1,
                r.forEach(e => {
                    n[e].forEach(r => {
                        t[r] && t[r].forEach(t => {
                            t.length === 1 && this.isVariable(t) && !n[e].has(t) && (n[e].add(t),
                            a = !0)
                        }
                        )
                    }
                    )
                }
                );
            let o = !1
              , s = [];
            r.forEach(e => {
                let t = Array.from(n[e]).filter(t => t !== e);
                t.length > 0 && (o = !0,
                s.push(`&bull; <b>${e}</b> dapat mencapai &rarr; { <b>${t.join(`, `)}</b> }`))
            }
            ),
            o ? (i.push(`<b>Langkah 1: Mencari Rantai Ketercapaian Produksi Unit (Variabel &rarr; Variabel Tunggal)</b>`),
            i.push(`Berikut adalah rantai turunan unit untuk variabel yang memilikinya:<br>` + s.join(`<br>`)),
            i.push(`<br><b>Langkah 2: Substitusi dengan Produksi Non-Unit</b>`),
            i.push(`Produksi unit dihapus, dan variabel asal secara langsung mewarisi seluruh aturan produksi non-unit dari variabel tujuannya.`)) : i.push(`Tidak ada produksi unit (Variabel tunggal &rarr; Variabel tunggal) yang ditemukan. Tata bahasa tidak mengalami perubahan pada tahap ini.`);
            let c = {}
              , l = {};
            return r.forEach(e => {
                c[e] = new Set,
                n[e].forEach(n => {
                    t[n] && t[n].forEach(t => {
                        t.length === 1 && this.isVariable(t) || c[e].add(t)
                    }
                    )
                }
                );
                let r = Array.from(c[e]).sort()
                  , a = t[e].join(` | `)
                  , o = r.join(` | `) || `&empty;`;
                a !== o && i.push(`&bull; <b>Variabel ${e}</b>: Aturan awal <code class="text-blue-700 bg-blue-50 px-1 rounded">${e} &rarr; ${a}</code> disubstitusi menjadi <code class="text-emerald-700 bg-emerald-50 px-1 rounded font-bold">${e} &rarr; ${o}</code>.`),
                l[e] = r
            }
            ),
            {
                grammar: l,
                desc: `Menghapus aturan A &rarr; B dan menggantinya secara langsung dengan rantai turunan non-unit dari B.`,
                details: i
            }
        },
        removeUseless(e, t) {
            let n = this.cloneGrammar(e)
              , r = []
              , i = new Set
              , a = !0
              , o = e => {
                for (let t of e)
                    if (this.isVariable(t) && !i.has(t))
                        return !1;
                return !0
            }
            ;
            for (; a; ) {
                a = !1;
                for (let e in n)
                    if (!i.has(e)) {
                        for (let t of n[e])
                            if (o(t)) {
                                i.add(e),
                                a = !0;
                                break
                            }
                    }
            }
            let s = Object.keys(n).filter(e => !i.has(e));
            r.push(`<b>Fase 1: Uji Terminating (Kemampuan Menurunkan String Terminal)</b>`),
            r.push(`Himpunan variabel yang terbukti dapat menghasilkan terminal murni: { <b>${Array.from(i).join(`, `)}</b> }`),
            s.length > 0 ? r.push(`<i>&bull; Menghapus variabel yang gagal memproduksi terminal (Non-Generating): { <b class="text-red-600">${s.join(`, `)}</b> } beserta seluruh produksi yang memuatnya.</i>`) : r.push(`<i>&bull; Semua variabel terbukti bersifat Terminating.</i>`);
            let c = {};
            for (let e in n)
                if (i.has(e)) {
                    let t = n[e].filter(e => o(e));
                    t.length > 0 && (c[e] = t)
                }
            let l = new Set([t])
              , u = [t];
            for (; u.length > 0; ) {
                let e = u.shift();
                c[e] && c[e].forEach(e => {
                    for (let t of e)
                        this.isVariable(t) && !l.has(t) && (l.add(t),
                        u.push(t))
                }
                )
            }
            let d = Object.keys(c).filter(e => !l.has(e));
            r.push(`<br><b>Fase 2: Uji Reachable (Ketercapaian dari Start Symbol '${t}')</b>`),
            r.push(`Himpunan variabel yang dapat dicapai secara berantai dari simbol awal: { <b>${Array.from(l).join(`, `)}</b> }`),
            d.length > 0 ? r.push(`<i>&bull; Menghapus variabel terisolasi yang tidak dapat dicapai dari S (Unreachable): { <b class="text-red-600">${d.join(`, `)}</b> } beserta aturannya.</i>`) : r.push(`<i>&bull; Semua variabel yang tersisa terbukti dapat dicapai dari Start Symbol.</i>`),
            s.length === 0 && d.length === 0 ? r.push(`<br><b class="text-emerald-700">Kesimpulan:</b> Tidak ada produksi redundan (<i>useless</i>) yang ditemukan. Semua variabel bermanfaat.`) : r.push(`<br><b class="text-emerald-700">Kesimpulan:</b> Produksi <i>useless</i> (Non-Terminating / Unreachable) telah berhasil dieliminasi dari daftar Grammar.`);
            let f = {};
            for (let e in c)
                l.has(e) && (f[e] = [...c[e]]);
            return {
                grammar: f,
                desc: `Mengeliminasi variabel dan aturan yang bersifat Non-Terminating dan Unreachable.`,
                details: r
            }
        },
        simplify(e) {
            let t = {}
              , n = e[0].variable;
            e.forEach(e => {
                if (e.variable && e.variable.trim() !== ``) {
                    let n = e.productions.split(`|`).map(e => e.trim().replace(/\s+/g, ``)).filter(e => e !== ``);
                    t[e.variable] ? t[e.variable] = [...t[e.variable], ...n] : t[e.variable] = n
                }
            }
            );
            let r = [{
                title: `0. Grammar Awal`,
                desc: `Bentuk aturan tata bahasa bebas konteks asli sebelum disederhanakan.`,
                details: [`Input asli (Pastikan baris pertama adalah Start Symbol).`],
                grammar: this.cloneGrammar(t)
            }]
              , i = this.removeEpsilon(t);
            r.push({
                title: `1. Penghilangan Produksi &epsilon;`,
                desc: i.desc,
                details: i.details,
                grammar: i.grammar
            }),
            t = i.grammar;
            let a = this.removeUnit(t);
            r.push({
                title: `2. Penghilangan Produksi Unit`,
                desc: a.desc,
                details: a.details,
                grammar: a.grammar
            }),
            t = a.grammar;
            let o = this.removeUseless(t, n);
            return r.push({
                title: `3. Penghilangan Produksi Useless`,
                desc: o.desc,
                details: o.details,
                grammar: o.grammar
            }),
            r
        }
    }
}
));
function u() {
    let e = d([{
        variable: `S`,
        productions: ``
    }])
      , t = d([])
      , n = () => {
        e.value.length === 1 && e.value[0].productions === `` && o(`lat10a-1`)
    }
      , r = () => {
        let t = e.value.map(e => e.variable)
          , n = `A`;
        for (let e = 65; e <= 90; e++) {
            let r = String.fromCharCode(e);
            if (!t.includes(r) && r !== `S`) {
                n = r;
                break
            }
        }
        e.value.push({
            variable: n,
            productions: ``
        })
    }
      , i = t => {
        t > 0 && e.value.splice(t, 1)
    }
      , a = t => {
        let n = e.value[t].productions || ``;
        n.length > 0 && !n.endsWith(`|`) && !n.endsWith(` `) && (n += ` | `),
        e.value[t].productions = n + `ε`
    }
      , o = t => {
        t === `lat10a-1` ? e.value = [{
            variable: `S`,
            productions: `AA | C | bd`
        }, {
            variable: `A`,
            productions: `Bb | ε`
        }, {
            variable: `B`,
            productions: `AB | d`
        }, {
            variable: `C`,
            productions: `de`
        }] : t === `lat10a-2` ? e.value = [{
            variable: `S`,
            productions: `aB | CA`
        }, {
            variable: `A`,
            productions: `a | bc`
        }, {
            variable: `B`,
            productions: `BC | Ab`
        }, {
            variable: `C`,
            productions: `aB | b`
        }] : t === `lat10a-3` && (e.value = [{
            variable: `S`,
            productions: `aB | bA | ε`
        }, {
            variable: `A`,
            productions: `abaS`
        }, {
            variable: `B`,
            productions: `babS`
        }])
    }
    ;
    return {
        cfgRules: e,
        cfgResultSteps: t,
        initCFG: n,
        addCFGRule: r,
        removeCFGRule: i,
        insertCFGEpsilon: a,
        loadCFGPreset: o,
        doRandomCFG: () => {
            let t = [[{
                variable: `S`,
                productions: `AB | a`
            }, {
                variable: `A`,
                productions: `B | ε`
            }, {
                variable: `B`,
                productions: `bB | c`
            }], [{
                variable: `S`,
                productions: `aA | bB | c`
            }, {
                variable: `A`,
                productions: `aA | a`
            }, {
                variable: `B`,
                productions: `bB`
            }], [{
                variable: `S`,
                productions: `XY | Z`
            }, {
                variable: `X`,
                productions: `xX | ε`
            }, {
                variable: `Y`,
                productions: `yY | ε`
            }, {
                variable: `Z`,
                productions: `W | z`
            }, {
                variable: `W`,
                productions: `w`
            }]]
              , n = t[Math.floor(Math.random() * t.length)];
            e.value = JSON.parse(JSON.stringify(n))
        }
        ,
        solveCFG: () => {
            t.value = c.simplify(e.value)
        }
    }
}
var d, f = e(( () => {
    l(),
    {ref: d} = window.Vue
}
)), p, m = e(( () => {
    p = {
        parse(e) {
            let t = []
              , n = []
              , r = new Set
              , i = {
                S: `q0`
            }
              , a = 1
              , o = e => (i[e] || (i[e] = `q${a++}`),
            i[e])
              , s = null
              , c = () => (s || (s = `q${a++}`,
            n.push(s)),
            s);
            e.length > 0 && e[0].variable && (i[e[0].variable] = `q0`),
            e.forEach(e => {
                e.variable && o(e.variable)
            }
            );
            let l = e.length > 0 && e[0].variable ? i[e[0].variable] : `q0`;
            e.forEach(e => {
                let i = o(e.variable);
                e.productions.split(`|`).map(e => e.trim().replace(/\s+/g, ``)).filter(e => e !== ``).forEach(e => {
                    if (e === `ε`)
                        n.includes(i) || n.push(i);
                    else if (/^[A-Z]$/.test(e))
                        t.push({
                            from: i,
                            to: o(e),
                            label: `ε`
                        });
                    else {
                        let n = e.match(/^([a-z]+)([A-Z])?$/);
                        if (n) {
                            let e = n[1]
                              , s = n[2]
                              , l = i;
                            for (let n = 0; n < e.length; n++) {
                                let i = e[n];
                                r.add(i);
                                let u;
                                u = n === e.length - 1 ? s ? o(s) : c() : `q${a++}`,
                                t.push({
                                    from: l,
                                    to: u,
                                    label: i
                                }),
                                l = u
                            }
                        }
                    }
                }
                )
            }
            );
            let u = Array.from({
                length: a
            }, (e, t) => `q${t}`);
            return u.length === 0 && (u = [`q0`]),
            {
                states: u,
                alphabet: Array.from(r).sort(),
                start: l,
                final: n,
                transitions: t,
                varMap: i
            }
        },
        generateRandom() {
            let e = [[{
                variable: `S`,
                productions: `xA | yB`
            }, {
                variable: `A`,
                productions: `xA | x`
            }, {
                variable: `B`,
                productions: `yB | ε`
            }], [{
                variable: `S`,
                productions: `xA | y`
            }, {
                variable: `A`,
                productions: `yA | xS | x`
            }], [{
                variable: `S`,
                productions: `xA | yB | ε`
            }, {
                variable: `A`,
                productions: `xA | yS`
            }, {
                variable: `B`,
                productions: `yB | xS`
            }]]
              , t = Math.floor(Math.random() * e.length);
            return JSON.parse(JSON.stringify(e[t]))
        }
    }
}
));
function h() {
    let e = g([{
        variable: `S`,
        productions: `aA | b`
    }, {
        variable: `A`,
        productions: `aA | ε`
    }])
      , t = _( () => p.parse(e.value))
      , n = e => {
        let t = e.match(/^q([0-9]+)$/);
        return t ? `q<sub>${t[1]}</sub>` : e
    }
    ;
    return {
        regRules: e,
        parsedFSA: t,
        detailedExplanations: _( () => {
            let r = []
              , i = t.value.varMap;
            return e.value.forEach(e => {
                if (!e.variable)
                    return;
                let t = []
                  , a = e.productions.split(`|`).map(e => e.trim().replace(/\s+/g, ``)).filter(e => e !== ``)
                  , o = n(i[e.variable])
                  , s = i[e.variable];
                a.forEach(r => {
                    if (r === `ε`)
                        t.push(`Produksi <code class="font-bold text-indigo-700 bg-indigo-100 px-1.5 rounded">${e.variable} &rarr; &epsilon;</code> menandakan mesin dapat berhenti di state ini. State <b>${o}</b> ditetapkan sebagai <b>State Akhir (Final State)</b>.`);
                    else if (/^[A-Z]$/.test(r)) {
                        let a = n(i[r]);
                        t.push(`Produksi Unit <code class="font-bold text-indigo-700 bg-indigo-100 px-1.5 rounded">${e.variable} &rarr; ${r}</code> membentuk transisi Epsilon (&epsilon;) move dari <b>${o}</b> ke <b>${a}</b>.`)
                    } else {
                        let a = r.match(/^([a-z]+)([A-Z])?$/);
                        if (a) {
                            let s = a[1]
                              , c = a[2]
                              , l = c ? n(i[c]) : `<b>State Akhir Universal</b>`;
                            s.length === 1 ? t.push(`Produksi <code class="font-bold text-indigo-700 bg-indigo-100 px-1.5 rounded">${e.variable} &rarr; ${r}</code> dikonversi menjadi panah transisi input <b>'${s}'</b> dari <b>${o}</b> menuju ${c ? `state <b>` + l + `</b>` : l}.`) : t.push(`Produksi rantai (multi-terminal) <code class="font-bold text-indigo-700 bg-indigo-100 px-1.5 rounded">${e.variable} &rarr; ${r}</code> dipecah menjadi serangkaian transisi berurutan melalui state dummy/perantara dengan urutan input <b>'${s.split(``).join(`', '`)}'</b> yang pada akhirnya akan berlabuh di ${c ? `state <b>` + l + `</b>` : l}.`)
                        } else
                            t.push(`<i>Abaikan/Error: Format produksi <b>${r}</b> tidak dikenali. Gunakan huruf abjad kecil untuk terminal.</i>`)
                    }
                }
                ),
                r.push({
                    variable: e.variable,
                    steps: t,
                    qStateHTML: o,
                    rawStateId: s
                })
            }
            ),
            r
        }
        ),
        addRegRule: () => {
            let t = e.value.map(e => e.variable)
              , n = `A`;
            for (let e = 65; e <= 90; e++) {
                let r = String.fromCharCode(e);
                if (!t.includes(r) && r !== `S`) {
                    n = r;
                    break
                }
            }
            e.value.push({
                variable: n,
                productions: ``
            })
        }
        ,
        removeRegRule: t => {
            e.value.length > 1 && e.value.splice(t, 1)
        }
        ,
        insertRegEpsilon: t => {
            let n = e.value[t].productions || ``;
            n.length > 0 && !n.endsWith(`|`) && !n.endsWith(` `) && (n += ` | `),
            e.value[t].productions = n + `ε`
        }
        ,
        randomizeReg: () => {
            e.value = p.generateRandom()
        }
        ,
        loadPreset: t => {
            t === `lat9-3` ? e.value = [{
                variable: `S`,
                productions: `aB | bA | ε`
            }, {
                variable: `A`,
                productions: `abaS`
            }, {
                variable: `B`,
                productions: `babS`
            }] : t === `lat9-4` ? e.value = [{
                variable: `S`,
                productions: `aA | B | baB | ε`
            }, {
                variable: `A`,
                productions: `bS | b`
            }, {
                variable: `B`,
                productions: `aS`
            }] : t === `lat9-5` && (e.value = [{
                variable: `S`,
                productions: `aS | bB | b`
            }, {
                variable: `B`,
                productions: `cC`
            }, {
                variable: `C`,
                productions: `aS`
            }])
        }
    }
}
var g, _, v = e(( () => {
    m(),
    {ref: g, computed: _} = window.Vue
}
)), y, b = e(( () => {
    y = {
        parseCFG(e) {
            let t = {};
            return e.forEach(e => {
                e.variable && e.variable.trim() !== `` && (t[e.variable] = e.productions.split(`|`).map(e => e.trim().replace(/\s+/g, ``)).filter(e => e !== ``))
            }
            ),
            t
        },
        findAmbiguousString(e, t) {
            let n = [{
                form: t
            }]
              , r = new Set
              , i = 0;
            for (; n.length > 0 && i < 3e4; ) {
                i++;
                let t = n.shift()
                  , a = t.form.match(/[A-Z]/);
                if (!a) {
                    if (r.has(t.form))
                        return {
                            found: !0,
                            string: t.form
                        };
                    r.add(t.form);
                    continue
                }
                if (t.form.replace(/[A-Z]/g, ``).length > 8)
                    continue;
                let o = a.index
                  , s = a[0];
                if (e[s])
                    for (let r of e[s]) {
                        let e = r === `ε` ? `` : r
                          , i = t.form.substring(0, o) + e + t.form.substring(o + 1);
                        n.push({
                            form: i
                        })
                    }
            }
            return {
                found: !1
            }
        },
        findDerivations(e, t, n) {
            let r = n
              , i = n === `ε` ? `` : n
              , a = []
              , o = []
              , s = 0
              , c = 5e5;
            function l(t, n, r, i) {
                if (s > c || (s++,
                r > i.length * 3 + 5))
                    return;
                let o = t.match(/[A-Z]/);
                if (!o) {
                    t === i && a.push([...n]);
                    return
                }
                let u = t.substring(0, o.index);
                if (u.length > 0 && !i.startsWith(u) || t.replace(/[A-Z]/g, ``).length > i.length && !Object.values(e).flat().includes(`ε`))
                    return;
                let d = o.index
                  , f = o[0];
                if (e[f])
                    for (let a of e[f]) {
                        let e = a === `ε` ? `` : a
                          , o = t.substring(0, d) + e + t.substring(d + 1)
                          , s = a === `ε` ? `ε` : a;
                        l(o, [...n, {
                            form: o,
                            prod: `${f} → ${s}`,
                            desc: `Substitusi variabel terkiri <b>${f}</b> → <b>${s}</b>`
                        }], r + 1, i)
                    }
            }
            function u(t, n, r, i) {
                if (s > c || (s++,
                r > i.length * 3 + 5))
                    return;
                let a = /[A-Z]/g, l, d;
                for (; (d = a.exec(t)) !== null; )
                    l = d;
                if (!l) {
                    t === i && o.push([...n]);
                    return
                }
                let f = t.substring(l.index + 1);
                if (f.length > 0 && !i.endsWith(f) || t.replace(/[A-Z]/g, ``).length > i.length && !Object.values(e).flat().includes(`ε`))
                    return;
                let p = l.index
                  , m = l[0];
                if (e[m])
                    for (let a of e[m]) {
                        let e = a === `ε` ? `` : a
                          , o = t.substring(0, p) + e + t.substring(p + 1)
                          , s = a === `ε` ? `ε` : a;
                        u(o, [...n, {
                            form: o,
                            prod: `${m} → ${s}`,
                            desc: `Substitusi variabel terkanan <b>${m}</b> → <b>${s}</b>`
                        }], r + 1, i)
                    }
            }
            l(t, [{
                form: t,
                prod: `Start`,
                desc: `Kondisi Awal (Start Symbol)`
            }], 0, i),
            s = 0,
            u(t, [{
                form: t,
                prod: `Start`,
                desc: `Kondisi Awal (Start Symbol)`
            }], 0, i);
            let d = null
              , f = null
              , p = null
              , m = (e, n) => {
                let r = []
                  , i = []
                  , a = 1
                  , o = [{
                    id: a++,
                    label: t,
                    isVar: !0
                }];
                r.push(o[0]);
                for (let t = 1; t < e.length; t++) {
                    let s = e[t].prod.split(` → `)
                      , c = s.length > 1 ? s[1] : ``
                      , l = -1;
                    if (n)
                        l = o.findIndex(e => e.isVar);
                    else
                        for (let e = o.length - 1; e >= 0; e--)
                            if (o[e].isVar) {
                                l = e;
                                break
                            }
                    if (l === -1)
                        break;
                    let u = o[l];
                    u.isVar = !1;
                    let d = [];
                    if (c === `ε` || c === ``) {
                        let e = {
                            id: a++,
                            label: `ε`,
                            isVar: !1
                        };
                        r.push(e),
                        i.push({
                            from: u.id,
                            to: e.id
                        })
                    } else
                        for (let e of c) {
                            let t = /[A-Z]/.test(e)
                              , n = {
                                id: a++,
                                label: e,
                                isVar: t
                            };
                            r.push(n),
                            i.push({
                                from: u.id,
                                to: n.id
                            }),
                            d.push(n)
                        }
                    o.splice(l, 1, ...d)
                }
                return {
                    nodes: r,
                    edges: i
                }
            }
            ;
            return a.length > 0 && (d = m(a[0], !0)),
            o.length > 0 && (f = m(o[0], !1)),
            a.length > 1 && (p = m(a[1], !0)),
            {
                isAmbiguous: a.length > 1,
                leftmostPaths: a,
                rightmostPaths: o,
                leftTree: d,
                rightTree: f,
                altTree: p,
                success: a.length > 0,
                actualString: i === `` ? `ε` : i,
                originalString: r
            }
        }
    }
}
));
function x() {
    let e = S([{
        variable: `S`,
        productions: ``
    }])
      , t = S(``)
      , n = S(null)
      , r = S(!1)
      , i = () => {
        e.value.length === 1 && e.value[0].productions === `` && c(`lat10b`)
    }
      , a = () => {
        let t = e.value.map(e => e.variable)
          , n = `A`;
        for (let e = 65; e <= 90; e++) {
            let r = String.fromCharCode(e);
            if (!t.includes(r) && r !== `S`) {
                n = r;
                break
            }
        }
        e.value.push({
            variable: n,
            productions: ``
        })
    }
      , o = t => {
        t > 0 && e.value.splice(t, 1)
    }
      , s = t => {
        let n = e.value[t].productions || ``;
        n.length > 0 && !n.endsWith(`|`) && !n.endsWith(` `) && (n += ` | `),
        e.value[t].productions = n + `ε`
    }
      , c = n => {
        n === `lat10b` && (e.value = [{
            variable: `S`,
            productions: `aB | bA`
        }, {
            variable: `A`,
            productions: `a | aS | bAA`
        }, {
            variable: `B`,
            productions: `b | bS | aBB`
        }],
        t.value = ``)
    }
    ;
    return {
        derivRules: e,
        targetString: t,
        derivationResult: n,
        isCalculating: r,
        initDerivation: i,
        addDerivRule: a,
        removeDerivRule: o,
        insertDerivEpsilon: s,
        loadDerivationPreset: c,
        doRandomDerivation: () => {
            let n = [{
                rules: [{
                    variable: `S`,
                    productions: `aSa | bSb | c`
                }],
                target: `abcba`
            }, {
                rules: [{
                    variable: `S`,
                    productions: `AB`
                }, {
                    variable: `A`,
                    productions: `aA | a`
                }, {
                    variable: `B`,
                    productions: `bB | b`
                }],
                target: `aabb`
            }, {
                rules: [{
                    variable: `S`,
                    productions: `aB | bA`
                }, {
                    variable: `A`,
                    productions: `a | aS | bAA`
                }, {
                    variable: `B`,
                    productions: `b | bS | aBB`
                }],
                target: ``
            }]
              , r = n[Math.floor(Math.random() * n.length)];
            e.value = JSON.parse(JSON.stringify(r.rules)),
            t.value = r.target
        }
        ,
        solveDerivation: () => new Promise(i => {
            r.value = !0;
            let a = y.parseCFG(e.value)
              , o = e.value[0].variable;
            setTimeout( () => {
                let e = t.value.trim();
                if (e === ``) {
                    let s = y.findAmbiguousString(a, o);
                    if (s.found)
                        e = s.string === `` ? `ε` : s.string,
                        t.value = e;
                    else {
                        n.value = {
                            success: !1,
                            reason: `Tidak dapat menemukan string ambigu secara otomatis dalam batas pencarian wajar. CFG ini mungkin tidak ambigu.`
                        },
                        r.value = !1,
                        i(n.value);
                        return
                    }
                }
                n.value = y.findDerivations(a, o, e),
                r.value = !1,
                i(n.value)
            }
            , 50)
        }
        )
    }
}
var S, C = e(( () => {
    b(),
    {ref: S} = window.Vue
}
)), w, T = e(( () => {
    w = {
        isTerminal(e) {
            return /^[a-z0-9]$/.test(e)
        },
        formatVar(e) {
            return e.replace(/P_(\d+)/g, `P<sub>$1</sub>`)
        },
        convert(e) {
            let t = {};
            e.forEach(e => {
                if (e.variable && e.variable.trim() !== ``) {
                    let n = e.productions.split(`|`).map(e => e.trim().replace(/\s+/g, ``)).filter(e => e !== ``);
                    t[e.variable] = (t[e.variable] || []).concat(n.map(e => e.split(``)))
                }
            }
            );
            let n = e => {
                let t = {};
                for (let n in e)
                    t[this.formatVar(n)] = e[n].map(e => e.map(e => this.formatVar(e)).join(``));
                return t
            }
              , r = [];
            r.push({
                title: `0. Grammar Awal`,
                desc: `Aturan produksi asli sebelum dikenakan konversi Bentuk Normal Chomsky (CNF).`,
                details: [`<b>Syarat Mutlak CNF:</b> Semua aturan produksi hanya boleh berbentuk <b>A &rarr; BC</b> (tepat dua variabel) atau <b>A &rarr; a</b> (tepat satu terminal).`, `<i>*Asumsi: Tata bahasa di bawah ini sudah disederhanakan (Bebas dari produksi &epsilon; dan produksi Unit).</i>`],
                grammar: n(t)
            });
            let i = 1
              , a = {}
              , o = {}
              , s = {}
              , c = []
              , l = {};
            for (let e in t) {
                l[e] = [];
                for (let n of t[e])
                    if (n.length === 1 && this.isTerminal(n[0]))
                        l[e].push(n);
                    else {
                        let t = []
                          , r = !1;
                        for (let e of n)
                            this.isTerminal(e) ? (r = !0,
                            a[e] || (a[e] = `P_${i++}`,
                            s[a[e]] = [e],
                            c.push(`&bull; Membentuk variabel baru untuk menampung terminal <b>'${e}'</b>: <code class="text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded">${this.formatVar(a[e])} &rarr; ${e}</code>`)),
                            t.push(a[e])) : t.push(e);
                        if (r) {
                            let r = n.join(``)
                              , i = t.map(e => this.formatVar(e)).join(``);
                            c.push(`&bull; Substitusi terminal pada <code class="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">${this.formatVar(e)} &rarr; ${r}</code> disesuaikan menjadi <code class="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">${this.formatVar(e)} &rarr; ${i}</code>.`)
                        }
                        l[e].push(t)
                    }
            }
            let u = JSON.parse(JSON.stringify(l));
            for (let e in s)
                u[e] = [s[e]];
            r.push({
                title: `1. Penggantian Terminal Campuran`,
                desc: `Berdasarkan syarat CNF, terminal <b>tidak boleh</b> berada pada ruas kanan yang panjangnya lebih dari satu (tidak boleh bercampur dengan variabel atau terminal lain). Terminal tersebut harus diwakilkan oleh variabel baru.`,
                details: c.length > 0 ? c : [`Tidak ditemukan terminal campuran yang menyalahi aturan CNF. Tahap ini dilewati.`],
                grammar: n(u)
            });
            let d = []
              , f = {};
            for (let e in u) {
                f[e] = [];
                for (let t of u[e])
                    if (t.length <= 2)
                        f[e].push(t);
                    else {
                        let n = [...t]
                          , r = t.map(e => this.formatVar(e)).join(``)
                          , a = `&bull; Mereduksi kepanjangan aturan <code class="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">${this.formatVar(e)} &rarr; ${r}</code>:<br>`;
                        for (; n.length > 2; ) {
                            let e = n.length
                              , t = n[e - 2]
                              , r = n[e - 1]
                              , c = t + r
                              , l = this.formatVar(t) + this.formatVar(r);
                            o[c] || (o[c] = `P_${i++}`,
                            s[o[c]] = [t, r],
                            a += `&nbsp;&nbsp;&nbsp;&rArr; Membentuk variabel pemecah untuk ujung kanan <b>${l}</b>: <code class="text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded">${this.formatVar(o[c])} &rarr; ${l}</code><br>`),
                            n.splice(e - 2, 2, o[c])
                        }
                        let c = n.map(e => this.formatVar(e)).join(``);
                        a += `&nbsp;&nbsp;&nbsp;&rArr; Substitusikan sehingga aturan utamanya menjadi <code class="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">${this.formatVar(e)} &rarr; ${c}</code>.`,
                        d.push(a),
                        f[e].push(n)
                    }
            }
            let p = JSON.parse(JSON.stringify(f));
            for (let e in s)
                p[e] || (p[e] = [s[e]]);
            return r.push({
                title: `2. Restrukturisasi Variabel Berantai (CNF Final)`,
                desc: `Aturan produksi maksimal hanya boleh menghasilkan <b>tepat dua variabel</b>. Aturan yang rantainya lebih dari dua dikelompokkan dan dipangkas dari arah kanan ke kiri menggunakan variabel baru.`,
                details: d.length > 0 ? d : [`Semua produksi variabel sudah memiliki panjang maksimal 2. Tahap ini dilewati.`],
                grammar: n(p)
            }),
            r
        },
        generateRandom() {
            let e = [[{
                variable: `S`,
                productions: `aABb | bBAa | ab`
            }, {
                variable: `A`,
                productions: `aA | a | bc`
            }, {
                variable: `B`,
                productions: `bB | b | ca`
            }], [{
                variable: `S`,
                productions: `ABa | bCA | cAB | abc`
            }, {
                variable: `A`,
                productions: `aA | bB | c`
            }, {
                variable: `B`,
                productions: `BC | Ab | a`
            }, {
                variable: `C`,
                productions: `cC | c | ab`
            }], [{
                variable: `S`,
                productions: `aSb | aA | bB`
            }, {
                variable: `A`,
                productions: `aAa | a | aa`
            }, {
                variable: `B`,
                productions: `bBb | b | bb`
            }], [{
                variable: `S`,
                productions: `aBCD | bCDA`
            }, {
                variable: `A`,
                productions: `aA | a`
            }, {
                variable: `B`,
                productions: `bB | b`
            }, {
                variable: `C`,
                productions: `cC | c`
            }, {
                variable: `D`,
                productions: `dD | d`
            }], [{
                variable: `S`,
                productions: `abABcd | cdBAab | abcd`
            }, {
                variable: `A`,
                productions: `abA | ab`
            }, {
                variable: `B`,
                productions: `cdB | cd`
            }]]
              , t = Math.floor(Math.random() * e.length);
            return JSON.parse(JSON.stringify(e[t]))
        }
    }
}
));
function E() {
    let e = D([{
        variable: `S`,
        productions: ``
    }])
      , t = D([])
      , n = () => {
        e.value.length === 1 && e.value[0].productions === `` && a(`lat11a-1`)
    }
      , r = () => {
        let t = e.value.map(e => e.variable)
          , n = `A`;
        for (let e = 65; e <= 90; e++) {
            let r = String.fromCharCode(e);
            if (!t.includes(r) && r !== `S`) {
                n = r;
                break
            }
        }
        e.value.push({
            variable: n,
            productions: ``
        })
    }
      , i = t => {
        t > 0 && e.value.splice(t, 1)
    }
      , a = t => {
        t === `lat11a-1` ? e.value = [{
            variable: `S`,
            productions: `aB | CA`
        }, {
            variable: `A`,
            productions: `a | bc`
        }, {
            variable: `B`,
            productions: `BC | Ab`
        }, {
            variable: `C`,
            productions: `aB | b`
        }] : t === `lat11a-2` && (e.value = [{
            variable: `S`,
            productions: `aAB | ch | CD`
        }, {
            variable: `A`,
            productions: `dbE | eEC`
        }, {
            variable: `B`,
            productions: `ff | DD`
        }, {
            variable: `C`,
            productions: `ADB | aS`
        }, {
            variable: `D`,
            productions: `i`
        }, {
            variable: `E`,
            productions: `jD`
        }])
    }
    ;
    return {
        cnfRules: e,
        cnfResultSteps: t,
        initCNF: n,
        addCNFRule: r,
        removeCNFRule: i,
        loadCNFPreset: a,
        doRandomCNF: () => {
            e.value = w.generateRandom()
        }
        ,
        solveCNF: () => {
            t.value = w.convert(e.value)
        }
    }
}
var D, O = e(( () => {
    T(),
    {ref: D} = window.Vue
}
)), k, A = e(( () => {
    k = {
        formatVar(e) {
            return e.replace(/Z_(\d+)/g, `Z<sub>$1</sub>`)
        },
        solve(e) {
            let t = {};
            e.forEach(e => {
                if (e.variable && e.variable.trim() !== ``) {
                    let n = e.productions.split(`|`).map(e => e.trim().replace(/\s+/g, ``)).filter(e => e !== ``);
                    t[e.variable] = (t[e.variable] || []).concat(n)
                }
            }
            );
            let n = []
              , r = []
              , i = {}
              , a = 1;
            for (let e of Object.keys(t)) {
                let n = []
                  , o = [];
                if (t[e].forEach(t => {
                    if (t.startsWith(e)) {
                        let r = t.substring(e.length);
                        n.push(r === `` ? `ε` : r)
                    } else
                        o.push(t)
                }
                ),
                n.length > 0) {
                    let t = `Z_${a++}`
                      , s = n.map(t => `${e}${t === `ε` ? `` : t}`)
                      , c = o.length > 0 ? o : [`ε`];
                    o.length === 0 && o.push(`ε`);
                    let l = `<div class="mb-3 text-slate-800 border-b pb-4 border-slate-100 last:border-b-0"><b>Untuk yang memiliki simbol ruas kiri ${e}:</b><br>`;
                    l += `<div class="text-sm mt-2 mb-3 font-mono bg-white border border-slate-200 px-2 py-1.5 rounded inline-block shadow-sm">${e} &rarr; ${s.join(` | `)} | ${c.join(` | `)}</div>`,
                    l += `<div class="text-sm mb-3 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">Simbol ruas kiri:<br>`,
                    l += `&bull; <b>${e}</b>: ${n.map( (e, t) => `&alpha;<sub>${t + 1}</sub>=${e}`).join(`, `)}<br>`,
                    l += `&bull; <b>${e}</b>: ${c.map( (e, t) => `&beta;<sub>${t + 1}</sub>=${e}`).join(`, `)}</div>`;
                    let u = []
                      , d = []
                      , f = []
                      , p = [];
                    o.forEach(e => {
                        let n = e === `ε` ? `` : e;
                        u.push(e),
                        n + t !== `` && u.push(n + t)
                    }
                    ),
                    n.forEach(e => {
                        let n = e === `ε` ? `` : e;
                        f.push(e),
                        n + t !== `` && p.push(n + t),
                        d.push(e),
                        n + t !== `` && d.push(n + t)
                    }
                    ),
                    u = [...new Set(u)],
                    d = [...new Set(d)],
                    i[e] = u,
                    i[t] = d,
                    l += `<div class="text-sm font-bold text-emerald-800 mb-1">diganti dengan:</div>`,
                    l += `<div class="font-mono text-emerald-700 bg-emerald-50 px-3 py-2 rounded-md inline-block shadow-sm border border-emerald-100">`,
                    l += `${e} &rarr; ${u.map(e => this.formatVar(e)).join(` | `)}<br>`,
                    l += `${this.formatVar(t)} &rarr; ${f.join(` | `)}<br>`,
                    l += `${this.formatVar(t)} &rarr; ${p.map(e => this.formatVar(e)).join(` | `)}`,
                    l += `</div></div>`,
                    r.push(l)
                } else
                    i[e] = [...t[e]]
            }
            let o = {};
            for (let e in i)
                o[this.formatVar(e)] = i[e].map(e => this.formatVar(e));
            return n.push({
                title: `Tahapan Penghilangan Rekursif Kiri`,
                desc: `Pemisahan aturan produksi yang rekursif kiri (&alpha;) dan yang tidak rekursif kiri (&beta;), kemudian membentuk aturan produksi pengganti menggunakan variabel bantu baru.`,
                details: r.length > 0 ? r : [`Tidak ditemukan aturan produksi yang memiliki sifat rekursif kiri (A &rarr; A&alpha;) pada grammar ini.`],
                grammar: o
            }),
            n
        },
        generateRandom() {
            let e = [[{
                variable: `S`,
                productions: `SA | SB | a | b`
            }, {
                variable: `A`,
                productions: `Aa | Ab | c`
            }, {
                variable: `B`,
                productions: `Ba | Bb | d`
            }], [{
                variable: `S`,
                productions: `Sxy | Syx | A | B`
            }, {
                variable: `A`,
                productions: `Ax | Ay | z`
            }, {
                variable: `B`,
                productions: `Bx | By | w`
            }], [{
                variable: `S`,
                productions: `SAb | SBa | a | b | c`
            }, {
                variable: `A`,
                productions: `Aab | Aba | a | b`
            }, {
                variable: `B`,
                productions: `Bab | Bba | c`
            }], [{
                variable: `S`,
                productions: `Sabc | Sdef | x | y | z`
            }, {
                variable: `A`,
                productions: `Aabc | Adef | u | v`
            }, {
                variable: `B`,
                productions: `Babc | Bdef | r | s`
            }], [{
                variable: `S`,
                productions: `SAB | SBA | aB | bA`
            }, {
                variable: `A`,
                productions: `Aa | Ab | a`
            }, {
                variable: `B`,
                productions: `Ba | Bb | b`
            }]]
              , t = Math.floor(Math.random() * e.length);
            return JSON.parse(JSON.stringify(e[t]))
        }
    }
}
));
function j() {
    let e = M([{
        variable: `S`,
        productions: ``
    }])
      , t = M([])
      , n = () => {
        e.value.length === 1 && e.value[0].productions === `` && a(`lat11b-1`)
    }
      , r = () => {
        let t = e.value.map(e => e.variable)
          , n = `A`;
        for (let e = 65; e <= 90; e++) {
            let r = String.fromCharCode(e);
            if (!t.includes(r) && r !== `S`) {
                n = r;
                break
            }
        }
        e.value.push({
            variable: n,
            productions: ``
        })
    }
      , i = t => {
        t > 0 && e.value.splice(t, 1)
    }
      , a = t => {
        t === `lat11b-1` ? e.value = [{
            variable: `A`,
            productions: `Aa | aBc`
        }] : t === `lat11b-2` ? e.value = [{
            variable: `A`,
            productions: `AbAB | ε`
        }, {
            variable: `B`,
            productions: `BaA | A | ε`
        }] : t === `lat11b-3` ? e.value = [{
            variable: `S`,
            productions: `SBa | Ab`
        }, {
            variable: `A`,
            productions: `Sa | AAb | a`
        }, {
            variable: `B`,
            productions: `Sb | BBa | b`
        }] : t === `lat11b-4` && (e.value = [{
            variable: `S`,
            productions: `SSC | SSB | abg`
        }, {
            variable: `B`,
            productions: `abc | BSb | BCd`
        }, {
            variable: `C`,
            productions: `ab`
        }])
    }
    ;
    return {
        lrRules: e,
        lrResultSteps: t,
        initLR: n,
        addLRRule: r,
        removeLRRule: i,
        loadLRPreset: a,
        doRandomLR: () => {
            e.value = k.generateRandom()
        }
        ,
        solveLR: () => {
            t.value = k.solve(e.value)
        }
    }
}
var M, N = e(( () => {
    A(),
    {ref: M} = window.Vue
}
)), P, F = e(( () => {
    P = {
        formatVar(e) {
            return e.replace(/Z_(\d+)/g, `Z<sub>$1</sub>`)
        },
        getFirstSymbol(e) {
            let t = e.match(/^(Z_\d+|[A-Z]|[a-z0-9])/);
            return t ? t[1] : ``
        },
        getRemainder(e, t) {
            return e.substring(t.length)
        },
        solve(e) {
            let t = {}
              , n = [];
            e.forEach(e => {
                if (e.variable && e.variable.trim() !== ``) {
                    n.includes(e.variable) || n.push(e.variable);
                    let r = e.productions.split(`|`).map(e => e.trim().replace(/\s+/g, ``)).filter(e => e !== ``);
                    t[e.variable] = (t[e.variable] || []).concat(r)
                }
            }
            );
            let r = []
              , i = e => {
                let t = {};
                for (let n in e)
                    t[this.formatVar(n)] = e[n].map(e => this.formatVar(e));
                return t
            }
            ;
            r.push({
                title: `0. Penentuan Urutan Variabel`,
                desc: `Langkah pertama dalam algoritma pembentukan GNF dengan substitusi adalah menetapkan urutan numerik untuk setiap simbol variabel.`,
                details: [`<div class="text-base text-slate-800">Berdasarkan input, ditetapkan urutan variabel:<br><div class="font-bold text-xl my-2 text-teal-700 bg-teal-50 px-3 py-2 rounded-lg inline-block border border-teal-200">${n.map(e => this.formatVar(e)).join(` &lt; `)}</div></div>`, `Aturan GNF mensyaratkan agar jika ada produksi <b>A<sub>h</sub> &rarr; A<sub>i</sub>&gamma;</b>, maka haruslah <b>h &lt; i</b>. Jika tidak, kita harus melakukan substitusi (jika <b>h &gt; i</b>) atau menghilangkan rekursif kiri (jika <b>h = i</b>).`],
                grammar: i(t)
            });
            let a = 1
              , o = []
              , s = [];
            for (let e = 0; e < n.length; e++) {
                let r = n[e];
                for (let i = 0; i < e; i++) {
                    let e = n[i]
                      , a = new Set
                      , o = !1
                      , c = [];
                    for (let n of t[r]) {
                        let r = this.getFirstSymbol(n);
                        if (r === e) {
                            o = !0;
                            let i = this.getRemainder(n, r)
                              , s = [];
                            for (let n of t[e]) {
                                let e = (n === `ε` ? `` : n) + i;
                                e = e === `` ? `ε` : e,
                                a.add(e),
                                s.push(this.formatVar(e))
                            }
                            c.push(`Produksi <code class="bg-slate-200 px-1 rounded">${this.formatVar(n)}</code> dipecah menjadi { ${s.join(`, `)} }`)
                        } else
                            a.add(n)
                    }
                    if (o) {
                        let n = `<div class="mb-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">`;
                        n += `<div class="font-bold text-slate-800 mb-2">Evaluasi urutan: ${this.formatVar(r)} terhadap ${this.formatVar(e)} (${this.formatVar(r)} &gt; ${this.formatVar(e)})</div>`,
                        n += `<div class="text-slate-600 mb-2">Karena variabel ruas kiri lebih besar urutannya, lakukan substitusi maju. Mengganti awalan <b>${this.formatVar(e)}</b> dengan produksi miliknya.</div>`,
                        n += `<ul class="list-disc ml-5 mb-3 text-slate-700">${c.map(e => `<li>${e}</li>`).join(``)}</ul>`,
                        n += `<div class="text-teal-700 font-mono bg-teal-50 border border-teal-100 px-3 py-2 rounded-lg shadow-sm"><b>Hasil ${this.formatVar(r)}:</b> ${this.formatVar(r)} &rarr; ${Array.from(a).map(e => this.formatVar(e)).join(` | `)}</div></div>`,
                        s.push(n),
                        t[r] = Array.from(a)
                    }
                }
                let i = []
                  , c = [];
                for (let e of t[r]) {
                    let t = this.getFirstSymbol(e);
                    t === r ? i.push(this.getRemainder(e, t) || `ε`) : c.push(e)
                }
                if (i.length > 0) {
                    let e = `Z_${a++}`;
                    o.push(e);
                    let n = `<div class="mb-4 bg-rose-50 border border-rose-200 p-4 rounded-xl">`;
                    n += `<div class="font-bold text-rose-900 mb-2 flex items-center gap-2"><i class="ph ph-warning"></i> Rekursif Kiri pada ${this.formatVar(r)}</div>`,
                    n += `<div class="text-slate-700 mb-3">Ditemukan aturan dimana simbol pertama ruas kanan sama dengan simbol ruas kiri (<b>${this.formatVar(r)} &rarr; ${this.formatVar(r)}...</b>). Sifat rekursif kiri ini dipisahkan menjadi komponen &alpha; (rekursif) dan &beta; (non-rekursif):</div>`,
                    n += `<div class="bg-white p-3 rounded-lg border shadow-sm mb-3 font-mono text-sm space-y-1">`,
                    n += `<div>&alpha; = { <span class="font-bold text-rose-600">${i.map(e => this.formatVar(e)).join(`, `)}</span> }</div>`,
                    n += `<div>&beta; = { <span class="font-bold text-teal-600">${c.length > 0 ? c.map(e => this.formatVar(e)).join(`, `) : `ε`}</span> }</div>`,
                    n += `</div>`;
                    let l = []
                      , u = [];
                    c.length === 0 && c.push(`ε`),
                    c.forEach(t => {
                        let n = t === `ε` ? `` : t;
                        l.push(t),
                        n + e !== `` && l.push(n + e)
                    }
                    ),
                    i.forEach(t => {
                        let n = t === `ε` ? `` : t;
                        u.push(t),
                        n + e !== `` && u.push(n + e)
                    }
                    ),
                    t[r] = [...new Set(l)],
                    t[e] = [...new Set(u)],
                    n += `<div class="text-slate-700 mb-2">Diganti menggunakan variabel baru <b>${this.formatVar(e)}</b> dengan rumusan substitusi:</div>`,
                    n += `<div class="font-mono bg-teal-50 text-teal-900 border border-teal-200 px-3 py-2 rounded-lg shadow-sm">`,
                    n += `<div>${this.formatVar(r)} &rarr; ${t[r].map(e => this.formatVar(e)).join(` | `)}</div>`,
                    n += `<div class="mt-1">${this.formatVar(e)} &rarr; ${t[e].map(e => this.formatVar(e)).join(` | `)}</div>`,
                    n += `</div></div>`,
                    s.push(n)
                }
            }
            r.push({
                title: `1. Substitusi Maju & Penghilangan Rekursif Kiri`,
                desc: `Memproses secara hierarkis dari variabel pertama hingga terakhir. Jika menemukan pelanggaran urutan (<b>A<sub>h</sub> &rarr; A<sub>i</sub>...</b> dimana <b>h &gt; i</b>), dilakukan substitusi. Jika menemukan rekursi kiri (<b>h = i</b>), dipecahkan menggunakan variabel baru <b>Z</b>.`,
                details: s.length > 0 ? s : [`Urutan simbol sudah sesuai (h &le; i) dan tidak ditemukan rekursif kiri. Lanjut ke tahap berikutnya.`],
                grammar: i(t)
            });
            let c = [];
            for (let e = n.length - 1; e >= 0; e--) {
                let r = n[e]
                  , i = new Set
                  , a = !1
                  , o = [];
                for (let e of t[r]) {
                    let r = this.getFirstSymbol(e);
                    if (n.includes(r)) {
                        a = !0;
                        let n = this.getRemainder(e, r)
                          , s = [];
                        for (let e of t[r]) {
                            let t = (e === `ε` ? `` : e) + n;
                            i.add(t),
                            s.push(this.formatVar(t))
                        }
                        o.push(`Mengganti <b>${this.formatVar(r)}</b> pada <code class="bg-slate-100 px-1 rounded">${this.formatVar(e)}</code> &rArr; { ${s.join(`, `)} }`)
                    } else
                        i.add(e)
                }
                if (a) {
                    t[r] = Array.from(i);
                    let e = `<div class="mb-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">`;
                    e += `<div class="font-bold text-slate-800 mb-2">Substitusi Mundur pada Variabel ${this.formatVar(r)}</div>`,
                    e += `<ul class="list-disc ml-5 mb-3 text-slate-600">${o.map(e => `<li>${e}</li>`).join(``)}</ul>`,
                    e += `<div class="text-teal-700 font-mono bg-teal-50 border border-teal-100 px-3 py-2 rounded-lg shadow-sm"><b>${this.formatVar(r)}</b> &rarr; ${t[r].map(e => this.formatVar(e)).join(` | `)}</div></div>`,
                    c.push(e)
                }
            }
            if (r.push({
                title: `2. Substitusi Mundur Variabel Utama`,
                desc: `Bergerak mundur dari variabel terkanan (terakhir) menuju variabel terawal. Semua variabel di ruas paling kiri akan diganti dengan produksi hasil akhirnya (yang pasti berawalan terminal).`,
                details: c.length > 0 ? c : [`<div class='bg-slate-50 p-4 border rounded-xl text-slate-600'>Seluruh aturan variabel utama secara kebetulan telah diawali oleh simbol terminal. Substitusi mundur tidak diperlukan.</div>`],
                grammar: i(t)
            }),
            o.length > 0) {
                let e = [];
                for (let r of o) {
                    let i = new Set
                      , a = !1
                      , o = [];
                    for (let e of t[r]) {
                        let r = this.getFirstSymbol(e);
                        if (n.includes(r)) {
                            a = !0;
                            let n = this.getRemainder(e, r)
                              , s = [];
                            for (let e of t[r]) {
                                let t = (e === `ε` ? `` : e) + n;
                                i.add(t),
                                s.push(this.formatVar(t))
                            }
                            o.push(`Mengganti <b>${this.formatVar(r)}</b> pada <code class="bg-slate-100 px-1 rounded">${this.formatVar(e)}</code> &rArr; { ${s.join(`, `)} }`)
                        } else
                            i.add(e)
                    }
                    if (a) {
                        t[r] = Array.from(i);
                        let n = `<div class="mb-4 bg-orange-50 border border-orange-200 p-4 rounded-xl">`;
                        n += `<div class="font-bold text-orange-900 mb-2">Finalisasi Variabel ${this.formatVar(r)}</div>`,
                        n += `<ul class="list-disc ml-5 mb-3 text-orange-800">${o.map(e => `<li>${e}</li>`).join(``)}</ul>`,
                        n += `<div class="text-orange-900 font-mono bg-white border border-orange-200 px-3 py-2 rounded-lg shadow-sm"><b>${this.formatVar(r)}</b> &rarr; ${t[r].map(e => this.formatVar(e)).join(` | `)}</div></div>`,
                        e.push(n)
                    }
                }
                r.push({
                    title: `3. Konversi Variabel Bantu (Hasil Akhir GNF)`,
                    desc: `Aturan produksi dari variabel baru (<b>Z</b>) yang dibentuk pada tahap 1 juga harus dipastikan semuanya diawali dengan terminal dengan men-substitusikan variabel awalannya.`,
                    details: e.length > 0 ? e : [`Aturan variabel Z sudah dimulai dengan terminal.`],
                    grammar: i(t)
                })
            } else
                r.push({
                    title: `3. Hasil Akhir GNF`,
                    desc: `Seluruh tahapan pembentukan Bentuk Normal Greibach telah selesai sempurna tanpa kemunculan rekursi kiri.`,
                    details: [`<div class='bg-teal-50 p-4 border border-teal-200 text-teal-800 rounded-xl font-bold'>Semua aturan produksi pada grammar ini telah berhasil memenuhi kriteria GNF (setiap ruas kanan diawali tepat satu terminal).</div>`],
                    grammar: i(t)
                });
            return r
        },
        generateRandom() {
            let e = [[{
                variable: `S`,
                productions: `AB`
            }, {
                variable: `A`,
                productions: `BS | b`
            }, {
                variable: `B`,
                productions: `SA | a`
            }], [{
                variable: `S`,
                productions: `AA | d`
            }, {
                variable: `A`,
                productions: `SS | b`
            }], [{
                variable: `S`,
                productions: `BA | AB`
            }, {
                variable: `A`,
                productions: `SA | BS | a`
            }, {
                variable: `B`,
                productions: `SB | SA | b`
            }]]
              , t = Math.floor(Math.random() * e.length);
            return JSON.parse(JSON.stringify(e[t]))
        }
    }
}
)), I, L = e(( () => {
    I = {
        formatVar(e) {
            return e.replace(/Z_(\d+)/g, `Z<sub>$1</sub>`)
        },
        toMatrixHTML(e) {
            let t = `<table class="inline-block border-l-2 border-r-2 border-slate-700 mx-2 text-center align-middle" style="border-radius: 4px; border-collapse: separate;">`;
            for (let n of e) {
                t += `<tr>`;
                for (let e of n) {
                    let n = e === `` || e.length === 0 ? `0` : this.formatVar(Array.isArray(e) ? e.join(` + `) : e);
                    t += `<td class="px-3 py-1 font-mono">${n}</td>`
                }
                t += `</tr>`
            }
            return t += `</table>`,
            t
        },
        solve(e) {
            let t = []
              , n = {};
            e.forEach(e => {
                e.variable && e.variable.trim() !== `` && (t.includes(e.variable) || t.push(e.variable),
                n[e.variable] = e.productions.split(`|`).map(e => e.trim().replace(/\s+/g, ``)).filter(e => e !== ``))
            }
            );
            let r = t.length
              , i = Array(r).fill(0).map( () => [])
              , a = Array(r).fill(0).map( () => Array(r).fill(0).map( () => []));
            for (let e = 0; e < r; e++) {
                let r = t[e];
                for (let o of n[r]) {
                    let n = o.match(/^[A-Z]/);
                    if (n) {
                        let r = n[0]
                          , s = t.indexOf(r);
                        if (s !== -1) {
                            let t = o.substring(1);
                            t === `` && (t = `ε`),
                            a[s][e].push(t)
                        } else
                            i[e].push(o)
                    } else
                        i[e].push(o)
                }
            }
            let o = []
              , s = this.toMatrixHTML([t])
              , c = this.toMatrixHTML([i.map(e => e.length > 0 ? e.join(` + `) : `0`)])
              , l = this.toMatrixHTML(a.map(e => e.map(e => e.length > 0 ? e.join(` + `) : `0`)));
            o.push({
                title: `1. Representasi Persamaan Matriks`,
                desc: `Berdasarkan prinsip sistem persamaan linier, aturan produksi diubah ke dalam bentuk matriks <b class='bg-teal-100 px-1 rounded'>V = VR + S</b>.`,
                details: [`<b>V</b> (Vektor baris variabel) = ${s}`, `<b>R</b> (Matriks simbol variabel) = ${l}`, `<b>S</b> (Vektor baris simbol terminal) = ${c}`],
                grammar: {}
            });
            let u = Array(r).fill(0).map( () => Array(r).fill(``))
              , d = 1;
            for (let e = 0; e < r; e++)
                for (let t = 0; t < r; t++)
                    u[e][t] = `Z_${d++}`;
            let f = {}
              , p = [];
            for (let e = 0; e < r; e++) {
                let n = [];
                for (let t = 0; t < r; t++)
                    if (i[t].length > 0)
                        for (let r of i[t])
                            n.push(r + u[t][e]);
                for (let t of i[e])
                    n.push(t);
                f[t[e]] = n,
                p.push(`<b>${this.formatVar(t[e])}</b> = ${n.length > 0 ? n.map(e => this.formatVar(e)).join(` + `) : `0`}`)
            }
            o.push({
                title: `2. Matriks Q dan Penyelesaian Persamaan 1`,
                desc: `Diperkenalkan matriks Q yang mengandung simbol-simbol variabel baru. Persamaan penyelesaian untuk V menjadi <b class='bg-teal-100 px-1 rounded'>V = SQ + S</b>.`,
                details: [`<div class="mb-3"><b>Q</b> (Matriks variabel baru) = ${this.toMatrixHTML(u)}</div>`, `<div class="font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block mb-2">Didapat penyelesaian untuk V (Persamaan 1):</div>`, `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">${p.map(e => `<div class="font-mono">${e}</div>`).join(``)}</div>`],
                grammar: {}
            });
            let m = {}
              , h = [];
            for (let e = 0; e < r; e++)
                for (let t = 0; t < r; t++) {
                    let n = [];
                    for (let i = 0; i < r; i++)
                        if (a[e][i].length > 0)
                            for (let r of a[e][i]) {
                                let e = r === `ε` ? `` : r;
                                n.push(e + u[i][t])
                            }
                    if (a[e][t].length > 0)
                        for (let r of a[e][t]) {
                            let e = r === `ε` ? `` : r;
                            e !== `` && n.push(e)
                        }
                    m[u[e][t]] = n,
                    n.length > 0 && h.push(`<b>${this.formatVar(u[e][t])}</b> = ${n.map(e => this.formatVar(e)).join(` + `)}`)
                }
            o.push({
                title: `3. Penentuan Persamaan Matriks Q (Persamaan 2)`,
                desc: `Bentuk persamaan matriks untuk matriks variabel baru dirumuskan sebagai <b class='bg-teal-100 px-1 rounded'>Q = RQ + R</b>.`,
                details: [`<div class="font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block mb-2">Didapat penyelesaian untuk Q (Persamaan 2):</div>`, `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">${h.map(e => `<div class="font-mono text-sm">${e}</div>`).join(``)}</div>`],
                grammar: {}
            });
            let g = {};
            for (let e in f)
                g[e] = f[e];
            let _ = [];
            for (let e in m) {
                let n = new Set;
                for (let r of m[e]) {
                    let e = r.match(/^[A-Z]/);
                    if (e && t.includes(e[0])) {
                        let t = e[0]
                          , i = r.substring(t.length);
                        for (let e of f[t])
                            n.add(e + i)
                    } else
                        n.add(r)
                }
                let r = Array.from(n);
                r.length > 0 && (g[e] = r,
                _.push(`<b>${this.formatVar(e)}</b> = ${r.map(e => this.formatVar(e)).join(` + `)}`))
            }
            let v = {};
            for (let e in g)
                v[this.formatVar(e)] = g[e].map(e => this.formatVar(e));
            return o.push({
                title: `4. Substitusi (Hasil Akhir GNF)`,
                desc: `Substitusikan Persamaan 1 ke dalam Persamaan 2 agar variabel baru (Q) turut diawali oleh simbol terminal.`,
                details: [`<div class="font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block mb-2">Substitusi persamaan 1 ke persamaan 2 didapat:</div>`, `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">${_.map(e => `<div class="font-mono text-sm">${e}</div>`).join(``)}</div>`, `<br><b class="text-teal-700">Kesimpulan:</b> Semua aturan (Persamaan 1 dan persamaan hasil substitusi) telah berhasil menjadi Bentuk Normal Greibach (GNF).`],
                grammar: v
            }),
            o
        }
    }
}
));
function R() {
    let e = z([{
        variable: `S`,
        productions: ``
    }])
      , t = z([])
      , n = z(``)
      , r = () => {
        e.value.length === 1 && e.value[0].productions === `` && o(`lat12-1`)
    }
      , i = () => {
        let t = e.value.map(e => e.variable)
          , n = `A`;
        for (let e = 65; e <= 90; e++) {
            let r = String.fromCharCode(e);
            if (!t.includes(r) && r !== `S`) {
                n = r;
                break
            }
        }
        e.value.push({
            variable: n,
            productions: ``
        })
    }
      , a = t => {
        t > 0 && e.value.splice(t, 1)
    }
      , o = t => {
        t === `lat12-1` ? e.value = [{
            variable: `A`,
            productions: `BC`
        }, {
            variable: `B`,
            productions: `CA | b`
        }, {
            variable: `C`,
            productions: `AB | a`
        }] : t === `lat12-2` ? e.value = [{
            variable: `S`,
            productions: `AS | a`
        }, {
            variable: `A`,
            productions: `a`
        }] : t === `lat12-3` ? e.value = [{
            variable: `S`,
            productions: `AA | d`
        }, {
            variable: `A`,
            productions: `SS | b`
        }] : t === `lat12-4` ? e.value = [{
            variable: `S`,
            productions: `BA | AB`
        }, {
            variable: `A`,
            productions: `SA | BS | a`
        }, {
            variable: `B`,
            productions: `SB | SA | b`
        }] : t === `lat15-1` && (e.value = [{
            variable: `S`,
            productions: `AB`
        }, {
            variable: `A`,
            productions: `aA | a`
        }, {
            variable: `B`,
            productions: `bB | b`
        }])
    }
    ;
    return {
        gnfRules: e,
        gnfResultSteps: t,
        gnfMethodUsed: n,
        initGNF: r,
        addGNFRule: i,
        removeGNFRule: a,
        loadGNFPreset: o,
        doRandomGNF: () => {
            e.value = P.generateRandom()
        }
        ,
        solveGNF: r => {
            n.value = r,
            r === `matrix` ? t.value = I.solve(e.value) : t.value = P.solve(e.value)
        }
    }
}
var z, B = e(( () => {
    F(),
    L(),
    {ref: z} = window.Vue
}
)), V, H = e(( () => {
    V = {
        formatSub(e) {
            return e && String(e).replace(/([a-zA-Z])(\d+)/g, `$1<sub>$2</sub>`).replace(/q_(s|f)/g, `q<sub>$1</sub>`)
        },
        cfgToPDA(e) {
            let t = []
              , n = new Set
              , r = {};
            if (e.forEach(e => {
                if (e.variable && e.variable.trim() !== ``) {
                    t.includes(e.variable) || t.push(e.variable);
                    let i = e.productions.split(`|`).map(e => e.trim().replace(/\s+/g, ``)).filter(e => e !== ``);
                    r[e.variable] = i,
                    i.forEach(e => {
                        for (let t of e)
                            /^[a-z0-9]$/.test(t) && n.add(t)
                    }
                    )
                }
            }
            ),
            t.length === 0)
                return null;
            let i = t[0]
              , a = [`q1`, `q2`, `q3`]
              , o = [...t, ...Array.from(n), `Z0`]
              , s = [];
            s.push({
                title: `Langkah 1: Inisialisasi State`,
                desc: `Mesin PDA selalu memulai komputasi dari state persiapan awal (<b>q<sub>1</sub></b>) dengan kondisi elemen puncak stack (<i>top stack</i>) berisi penanda batas bawah (<b>Z<sub>0</sub></b>). Mesin membaca input hampa (<b>&epsilon;</b>) dan berpindah ke state operasional (<b>q<sub>2</sub></b>) sambil memasukkan (PUSH) Simbol Awal Grammar (<b>` + i + `</b>) ke dalam stack.`,
                funcList: [`δ(q<sub>1</sub>, ε, Z<sub>0</sub>) = {(q<sub>2</sub>, ${i}Z<sub>0</sub>)}`]
            });
            let c = [];
            for (let e of t) {
                let t = r[e].map(e => `(q<sub>2</sub>, ${e === `ε` ? `ε` : e})`).join(`, `);
                c.push(`δ(q<sub>2</sub>, ε, <b>${e}</b>) = { ${t} }`)
            }
            s.push({
                title: `Langkah 2: Fase Penjabaran (Ekspansi Variabel)`,
                desc: `Pada state operasional (<b>q<sub>2</sub></b>), jika elemen top stack adalah sebuah Variabel (Huruf Kapital), PDA akan mengeluarkannya (POP) tanpa membaca input eksternal (<b>&epsilon;</b>), lalu memasukkan (PUSH) ruas kanan dari aturan produksinya secara terbalik. Proses ini membuka seluruh kemungkinan cabang penurunan tata bahasa.`,
                funcList: c
            });
            let l = Array.from(n);
            if (l.length > 0) {
                let e = l.map(e => `δ(q<sub>2</sub>, <b>${e}</b>, <b>${e}</b>) = {(q<sub>2</sub>, ε)}`);
                s.push({
                    title: `Langkah 3: Fase Pencocokan (Verifikasi Terminal)`,
                    desc: `Jika elemen top stack adalah sebuah Simbol Terminal (huruf kecil/angka), PDA bertugas mencocokkan simbol tersebut dengan karakter yang saat ini dibaca dari pita input. Jika identik, karakter tersebut akan dikeluarkan (<b>POP</b>).`,
                    funcList: e
                })
            }
            return s.push({
                title: `Langkah 4: Fase Penerimaan (Acceptance)`,
                desc: `Bila seluruh input dari user telah selesai dibaca dan stack hanya menyisakan penanda awalnya (<b>Z<sub>0</sub></b>), maka PDA akan menempuh transisi terakhir menuju Final State (<b>q<sub>3</sub></b>). Kondisi ini memastikan bahwa untai yang dievaluasi sepenuhnya <b>Diterima</b> dan Valid.`,
                funcList: [`δ(q<sub>2</sub>, ε, Z<sub>0</sub>) = {(q<sub>3</sub>, Z<sub>0</sub>)}`]
            }),
            {
                V: t,
                Sig: Array.from(n),
                Q: a,
                Gam: o,
                S: i,
                transitions: s
            }
        },
        fsToNs(e) {
            let t = e.states
              , n = e.final
              , r = e.stackAlphabet.split(`,`).map(e => e.trim()).filter(e => e !== ``)
              , i = e.start.trim()
              , a = e.z0.trim()
              , o = [...t, `q_s`, `q_f`]
              , s = [...r, `X`]
              , c = []
              , l = [];
            c.push({
                title: `Langkah 1: Inisialisasi State & Penahan Stack`,
                desc: `<b>Tujuan:</b> Mencegah stack menjadi kosong sebelum waktunya.<br><b>Aksi:</b> Mesin disetel untuk berpindah dari state awal baru (<b>q<sub>s</sub></b>) ke state awal semula (<b>${this.formatSub(i)}</b>). Penanda dasar stack yang baru (<b>X</b>) ditahan di paling bawah, lalu simbol stack mula-mula yang asli (<b>${this.formatSub(a)}</b>) di-PUSH ke atasnya.`,
                func: `<div class="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-lg flex items-center gap-3 shadow-sm"><span class="font-mono text-base font-bold">δ'(q<sub>s</sub>, ε, X) = {(${this.formatSub(i)}, ${this.formatSub(a)}X)}</span></div>`
            }),
            l.push({
                from: `q_s`,
                input: `ε`,
                pop: `X`,
                to: i,
                push: `${a}X`
            });
            let u = e.transitions.map(e => {
                let t = e.input === `ε` || e.input === `` ? `ε` : e.input
                  , n = e.pop === `ε` || e.pop === `` ? `ε` : e.pop
                  , r = e.push === `ε` || e.push === `` ? `ε` : e.push;
                return l.push({
                    ...e,
                    input: t,
                    pop: n,
                    push: r
                }),
                `δ'(${this.formatSub(e.from)}, ${t}, ${this.formatSub(n)}) = {(${this.formatSub(e.to)}, ${this.formatSub(r)})}`
            }
            );
            c.push({
                title: `Langkah 2: Duplikasi Transisi Mesin Asal`,
                desc: `<b>Tujuan:</b> Mempertahankan alur logika pembacaan tata bahasa awal.<br><b>Aksi:</b> Menyalin seluruh fungsi transisi asal dari Mesin Final State PDA (M<sub>1</sub>) mentah-mentah tanpa modifikasi sedikitpun. Hal ini memungkinkan mesin NS-PDA baru untuk menyimulasikan persis apa yang dilakukan oleh mesin aslinya.`,
                func: `<div class="bg-slate-50 border border-slate-200 text-slate-800 p-3 rounded-lg flex items-start gap-3 shadow-sm"><div class="font-mono text-sm leading-relaxed">${u.length > 0 ? u.join(`<br>`) : `<i>(Tidak ada transisi)</i>`}</div></div>`
            });
            let d = [];
            n.forEach(e => {
                s.forEach(t => {
                    d.push(`δ'(${this.formatSub(e)}, ε, ${this.formatSub(t)}) = {(q<sub>f</sub>, ${this.formatSub(t)})}`),
                    l.push({
                        from: e,
                        input: `ε`,
                        pop: t,
                        to: `q_f`,
                        push: t
                    })
                }
                )
            }
            ),
            c.push({
                title: `Langkah 3: Jembatan Izin Menuju State Pengosong`,
                desc: `<b>Tujuan:</b> Memberikan hak akses pengosongan stack saat syarat penerimaan telah dicapai.<br><b>Aksi:</b> Karena mesin NS-PDA <i>hanya</i> akan menerima string jika stack kosong total, maka kita membangun jembatan (transisi &epsilon;) dari semua Final State lama menuju state pengosong (<b>q<sub>f</sub></b>). Transisi ini bebas ditempuh terlepas dari apapun isi top stack-nya.`,
                func: `<div class="bg-indigo-50 border border-indigo-200 text-indigo-900 p-3 rounded-lg flex items-start gap-3 shadow-sm max-h-48 overflow-y-auto"><div class="font-mono text-sm leading-relaxed">${d.length > 0 ? d.join(`<br>`) : `<i>(Mesin asal tidak memiliki Final State)</i>`}</div></div>`
            });
            let f = [];
            return s.forEach(e => {
                f.push(`δ'(q<sub>f</sub>, ε, ${this.formatSub(e)}) = {(q<sub>f</sub>, ε)}`),
                l.push({
                    from: `q_f`,
                    input: `ε`,
                    pop: e,
                    to: `q_f`,
                    push: `ε`
                })
            }
            ),
            c.push({
                title: `Langkah 4: Loop Pembersihan Stack Secara Paksa (POP)`,
                desc: `<b>Tujuan:</b> Menuntaskan penerimaan mesin NS-PDA.<br><b>Aksi:</b> Setelah berada di state <b>q<sub>f</sub></b>, mesin akan melakukan operasi rekursif (berputar terus menerus) untuk mengeluarkan (POP) elemen apapun yang tersisa, tanpa perlu membaca input tambahan. Begitu stack bersih tak tersisa, string dinyatakan valid!`,
                func: `<div class="bg-rose-50 border border-rose-200 text-rose-900 p-3 rounded-lg flex items-start gap-3 shadow-sm"><div class="font-mono text-sm leading-relaxed">${f.join(`<br>`)}</div></div>`
            }),
            {
                Q_new: o,
                Gam_new: s,
                start: `q_s`,
                final: ``,
                steps: c,
                rawTransitions: l
            }
        },
        nsToFs(e) {
            let t = e.states
              , n = e.stackAlphabet.split(`,`).map(e => e.trim()).filter(e => e !== ``)
              , r = e.start.trim()
              , i = e.z0.trim()
              , a = [...t, `q_s`, `q_f`]
              , o = [...n, `X`]
              , s = []
              , c = [];
            s.push({
                title: `Langkah 1: Inisialisasi State & Pemasangan Batas Stack`,
                desc: `<b>Tujuan:</b> Menghindari mesin kehilangan jejak kapan stack sejatinya sudah "kosong".<br><b>Aksi:</b> Membuat transisi dari state awal baru (<b>q<sub>s</sub></b>) ke state start asli (<b>${this.formatSub(r)}</b>). Penanda dasar pembatas (<b>X</b>) di-PUSH ke dasar, diikuti simbol awal asli (<b>${this.formatSub(i)}</b>). Kehadiran X mencegah stack mesin baru ini kosong secara permanen sebelum waktunya.`,
                func: `<div class="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-lg flex items-center gap-3 shadow-sm"><span class="font-mono text-base font-bold">δ'(q<sub>s</sub>, ε, X) = {(${this.formatSub(r)}, ${this.formatSub(i)}X)}</span></div>`
            }),
            c.push({
                from: `q_s`,
                input: `ε`,
                pop: `X`,
                to: r,
                push: `${i}X`
            });
            let l = e.transitions.map(e => {
                let t = e.input === `ε` || e.input === `` ? `ε` : e.input
                  , n = e.pop === `ε` || e.pop === `` ? `ε` : e.pop
                  , r = e.push === `ε` || e.push === `` ? `ε` : e.push;
                return c.push({
                    ...e,
                    input: t,
                    pop: n,
                    push: r
                }),
                `δ'(${this.formatSub(e.from)}, ${t}, ${this.formatSub(n)}) = {(${this.formatSub(e.to)}, ${this.formatSub(r)})}`
            }
            );
            s.push({
                title: `Langkah 2: Duplikasi Transisi Mesin Asal`,
                desc: `<b>Tujuan:</b> Melakukan komputasi selayaknya mesin aslinya.<br><b>Aksi:</b> Menyalin seluruh fungsi transisi dari mesin Null Stack PDA lama secara persis, sehingga mesin baru dapat berjalan mensimulasikan langkah yang identik.`,
                func: `<div class="bg-slate-50 border border-slate-200 text-slate-800 p-3 rounded-lg flex items-start gap-3 shadow-sm"><div class="font-mono text-sm leading-relaxed">${l.length > 0 ? l.join(`<br>`) : `<i>(Tidak ada transisi)</i>`}</div></div>`
            });
            let u = [];
            return t.forEach(e => {
                u.push(`δ'(${this.formatSub(e)}, ε, X) = {(q<sub>f</sub>, X)}`),
                c.push({
                    from: e,
                    input: `ε`,
                    pop: `X`,
                    to: `q_f`,
                    push: `X`
                })
            }
            ),
            s.push({
                title: `Langkah 3: Sensor Batas Stack`,
                desc: `<b>Tujuan:</b> Menangkap momen saat string sukses diselesaikan dan memaksanya menjadi penerimaan Final State.<br><b>Aksi:</b> Pada mesin NS-PDA asal, untai dikatakan selesai bila stack-nya kosong. Di mesin simulasi ini, stack tak akan pernah benar-benar kosong, melainkan akan tersisa <b>X</b> di dasarnya. Jika sensor mendeteksi <b>Top Stack = X</b>, itu artinya string dinyatakan valid, dan mesin wajib diarahkan ke Final State baru (<b>q<sub>f</sub></b>).`,
                func: `<div class="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-lg flex items-start gap-3 shadow-sm max-h-48 overflow-y-auto"><div class="font-mono text-sm leading-relaxed">${u.join(`<br>`)}</div></div>`
            }),
            {
                Q_new: a,
                Gam_new: o,
                start: `q_s`,
                final: `q_f`,
                steps: s,
                rawTransitions: c
            }
        },
        simulate(e, t) {
            t === `ε` && (t = ``);
            let n = e.final && e.final.length > 0
              , r = n ? `Final State (Berhenti di State Akhir)` : `Null Stack (Tumpukan Stack harus Kosong)`
              , i = [{
                state: e.start.trim(),
                stack: [e.z0.trim()],
                unconsumed: t,
                steps: [{
                    desc: `<div class="mb-1 text-indigo-700 font-bold border-b border-indigo-100 pb-1">Metode Penerimaan: ${r}</div><b>Kondisi Awal:</b> State <b>${this.formatSub(e.start.trim())}</b>, Sisa Input: <b>${t === `` ? `&epsilon;` : t}</b>, Stack (Top di kiri): <b>[${this.formatSub(e.z0.trim())}]</b>`
                }]
            }]
              , a = 0
              , o = e.stackAlphabet.split(`,`).map(e => e.trim()).sort( (e, t) => t.length - e.length)
              , s = -1
              , c = [];
            for (; i.length > 0 && a < 1e4; ) {
                a++;
                let r = i.shift()
                  , l = t.length - r.unconsumed.length;
                if (l > s && (s = l,
                c = r.steps),
                r.unconsumed === ``)
                    if (n) {
                        if (e.final.includes(r.state))
                            return r.steps.push({
                                desc: `<div class="bg-emerald-100 text-emerald-900 px-3 py-2 rounded mt-2"><b>&rArr; DITERIMA:</b> Seluruh string selesai dibaca dan berhenti di Final State (<b>${this.formatSub(r.state)}</b>).</div>`
                            }),
                            {
                                accepted: !0,
                                path: r.steps,
                                mode: `FS`
                            };
                        {
                            let e = `<div class="bg-red-50 text-red-800 px-3 py-2 rounded mt-2"><b>&rArr; DITOLAK (CRASH):</b> Input habis dibaca, tetapi berhenti di state <b>${this.formatSub(r.state)}</b> yang BUKAN Final State.</div>`;
                            l >= s && (s = l,
                            c = [...r.steps, {
                                desc: e
                            }])
                        }
                    } else if (r.stack.length === 0)
                        return r.steps.push({
                            desc: `<div class="bg-emerald-100 text-emerald-900 px-3 py-2 rounded mt-2"><b>&rArr; DITERIMA:</b> Seluruh string selesai dibaca dan Stack kosong.</div>`
                        }),
                        {
                            accepted: !0,
                            path: r.steps,
                            mode: `NS`
                        };
                    else {
                        let e = `<div class="bg-red-50 text-red-800 px-3 py-2 rounded mt-2"><b>&rArr; DITOLAK (CRASH):</b> Input habis dibaca, tetapi Stack belum kosong (tersisa <b>[${r.stack.map(e => this.formatSub(e)).reverse().join(`, `)}]</b>).</div>`;
                        l >= s && (s = l,
                        c = [...r.steps, {
                            desc: e
                        }])
                    }
                let u = r.stack.length > 0 ? r.stack[r.stack.length - 1] : null;
                if (!u) {
                    if (r.unconsumed !== ``) {
                        let e = `<div class="bg-red-50 text-red-800 px-3 py-2 rounded mt-2"><b>&rArr; DITOLAK (CRASH):</b> Stack sudah kosong namun masih ada input tersisa (<b>${r.unconsumed}</b>). Mesin berhenti paksa.</div>`;
                        l >= s && (s = l,
                        c = [...r.steps, {
                            desc: e
                        }])
                    }
                    continue
                }
                let d = !1;
                for (let t of e.transitions) {
                    if (t.from !== r.state || t.pop !== u)
                        continue;
                    let e = t.input === `ε` || t.input === ``;
                    if (!e && (r.unconsumed.length === 0 || r.unconsumed[0] !== t.input))
                        continue;
                    d = !0;
                    let n = e ? r.unconsumed : r.unconsumed.substring(1)
                      , a = [...r.stack];
                    a.pop();
                    let s = t.push === `ε` || t.push === `` ? `` : t.push
                      , c = []
                      , l = s;
                    for (; l.length > 0; ) {
                        let e = !1;
                        for (let t of o)
                            if (l.startsWith(t)) {
                                c.push(t),
                                l = l.substring(t.length),
                                e = !0;
                                break
                            }
                        e || (c.push(l[0]),
                        l = l.substring(1))
                    }
                    for (let e = c.length - 1; e >= 0; e--)
                        a.push(c[e]);
                    let f = `&delta;(${this.formatSub(t.from)}, ${e ? `&epsilon;` : t.input}, ${this.formatSub(t.pop)}) &rarr; (${this.formatSub(t.to)}, ${s === `` ? `&epsilon;` : this.formatSub(s)})`
                      , p = s === `` ? `(Keluarkan ${this.formatSub(t.pop)})` : `(Keluarkan ${this.formatSub(t.pop)}, Masukkan ${this.formatSub(s)})`
                      , m = `Jalankan <code class="bg-slate-200 text-slate-800 px-1 rounded">${f}</code><br>&rArr; State menjadi <b>${this.formatSub(t.to)}</b>.<br>&rArr; Sisa Input: <b>${n === `` ? `&epsilon;` : n}</b>.<br>&rArr; Stack ${p}: <b>[${a.length > 0 ? a.map(e => this.formatSub(e)).reverse().join(`, `) : `<i>KOSONG</i>`}]</b>`;
                    i.push({
                        state: t.to,
                        stack: a,
                        unconsumed: n,
                        steps: [...r.steps, {
                            desc: m
                        }]
                    })
                }
                if (!d && r.unconsumed !== ``) {
                    let e = `<div class="bg-red-50 text-red-800 px-3 py-2 rounded mt-2"><b>&rArr; DITOLAK (CRASH):</b> Tidak ada transisi valid dari state <b>${this.formatSub(r.state)}</b> untuk membaca input <b>${r.unconsumed[0]}</b> dengan Top Stack <b>${this.formatSub(u)}</b>.</div>`;
                    l >= s && (s = l,
                    c = [...r.steps, {
                        desc: e
                    }])
                }
            }
            return {
                accepted: !1,
                reason: n ? `String gagal divalidasi. Berikut adalah detail jalur komputasi terjauh sebelum mesin mengalami kebuntuan (crash) atau kehabisan input tanpa mencapai Final State.` : `String gagal divalidasi. Berikut adalah detail jalur komputasi terjauh sebelum mesin mengalami kebuntuan (crash) atau kehabisan input tanpa mengosongkan stack.`,
                path: c,
                mode: n ? `FS` : `NS`
            }
        },
        generateRandomEQ(e) {
            let t = [[`q0`, `q1`], [`q1`, `q2`], [`p0`, `p1`, `p2`]]
              , n = [`0, 1`, `a, b`, `x, y, z`]
              , r = [`X, Z0`, `A, B, Z0`, `0, 1, Z0`]
              , i = t[Math.floor(Math.random() * t.length)]
              , a = n[Math.floor(Math.random() * n.length)]
              , o = r[Math.floor(Math.random() * r.length)]
              , s = a.split(`,`).map(e => e.trim())
              , c = o.split(`,`).map(e => e.trim())
              , l = i[0]
              , u = c[c.length - 1]
              , d = Math.floor(Math.random() * 4) + 3
              , f = [];
            for (let e = 0; e < d; e++)
                f.push({
                    from: i[Math.floor(Math.random() * i.length)],
                    input: Math.random() > .3 ? s[Math.floor(Math.random() * s.length)] : `ε`,
                    pop: c[Math.floor(Math.random() * c.length)],
                    to: i[Math.floor(Math.random() * i.length)],
                    push: Math.random() > .3 ? c[Math.floor(Math.random() * c.length)] + c[Math.floor(Math.random() * c.length)] : `ε`
                });
            let p = [];
            return (e === `FS_TO_NS` || e === `TEST_STRING` && Math.random() > .5) && p.push(i[i.length - 1]),
            {
                states: i,
                inputAlphabet: a,
                stackAlphabet: o,
                start: l,
                z0: u,
                final: p,
                transitions: f
            }
        }
    }
}
));
function U() {
    let e = e => V.formatSub(e)
      , t = W([{
        variable: `S`,
        productions: ``
    }])
      , n = W(null)
      , r = () => {
        t.value.length === 1 && t.value[0].productions === `` && i(`lat13-1`)
    }
      , i = e => {
        e === `lat13-1` ? t.value = [{
            variable: `S`,
            productions: `aAA`
        }, {
            variable: `A`,
            productions: `aS | bS | a`
        }] : e === `lat15-2` && (t.value = [{
            variable: `S`,
            productions: `aS | Sb | ε`
        }])
    }
      , a = () => {
        let e = [[{
            variable: `S`,
            productions: `aSa | bSb | c`
        }], [{
            variable: `D`,
            productions: `aDa | bDb | c`
        }], [{
            variable: `S`,
            productions: `AB`
        }, {
            variable: `A`,
            productions: `aA | a`
        }, {
            variable: `B`,
            productions: `bB | b`
        }]];
        t.value = JSON.parse(JSON.stringify(e[Math.floor(Math.random() * e.length)]))
    }
      , o = () => {
        n.value = V.cfgToPDA(t.value)
    }
      , s = W(`TEST_STRING`)
      , c = W({
        states: [`q0`, `q1`],
        inputAlphabet: `0, 1`,
        stackAlphabet: `X, Z0`,
        start: `q0`,
        z0: `Z0`,
        final: [],
        transitions: [{
            from: `q0`,
            input: `1`,
            pop: `Z0`,
            to: `q0`,
            push: `XZ0`
        }]
    })
      , l = W(null)
      , u = W(``)
      , d = W(null)
      , f = G( () => c.value.stackAlphabet.split(`,`).map(e => e.trim()).filter(e => e !== ``))
      , p = () => {
        v(`lat13-2b`)
    }
      , m = () => {
        let e = 0;
        for (; c.value.states.includes(`q${e}`); )
            e++;
        c.value.states.push(`q${e}`)
    }
      , h = e => {
        c.value.states.length <= 1 || (c.value.states = c.value.states.filter(t => t !== e),
        c.value.start === e && (c.value.start = c.value.states[0]),
        c.value.final = c.value.final.filter(t => t !== e),
        c.value.transitions = c.value.transitions.filter(t => t.from !== e && t.to !== e))
    }
      , g = () => {
        c.value.transitions.push({
            from: c.value.states[0] || ``,
            input: ``,
            pop: ``,
            to: c.value.states[0] || ``,
            push: ``
        })
    }
      , _ = e => {
        c.value.transitions.splice(e, 1)
    }
      , v = e => {
        e === `contoh-fs-ns` ? (s.value = `FS_TO_NS`,
        u.value = ``,
        c.value = {
            states: [`q1`, `q2`, `q3`],
            inputAlphabet: `a, b, c`,
            stackAlphabet: `D, a, b, c, Z`,
            start: `q1`,
            z0: `Z`,
            final: [`q3`],
            transitions: [{
                from: `q1`,
                input: `ε`,
                pop: `Z`,
                to: `q2`,
                push: `DZ`
            }, {
                from: `q2`,
                input: `ε`,
                pop: `D`,
                to: `q2`,
                push: `aDa`
            }, {
                from: `q2`,
                input: `ε`,
                pop: `D`,
                to: `q2`,
                push: `bDb`
            }, {
                from: `q2`,
                input: `ε`,
                pop: `D`,
                to: `q2`,
                push: `c`
            }, {
                from: `q2`,
                input: `a`,
                pop: `a`,
                to: `q2`,
                push: `ε`
            }, {
                from: `q2`,
                input: `b`,
                pop: `b`,
                to: `q2`,
                push: `ε`
            }, {
                from: `q2`,
                input: `c`,
                pop: `c`,
                to: `q2`,
                push: `ε`
            }, {
                from: `q2`,
                input: `ε`,
                pop: `Z`,
                to: `q3`,
                push: `Z`
            }]
        }) : e === `lat13-2a` ? (s.value = `NS_TO_FS`,
        u.value = ``,
        c.value = {
            states: [`q0`, `q1`],
            inputAlphabet: `0, 1`,
            stackAlphabet: `X, Z`,
            start: `q0`,
            z0: `Z`,
            final: [],
            transitions: [{
                from: `q0`,
                input: `1`,
                pop: `Z`,
                to: `q0`,
                push: `XZ`
            }, {
                from: `q0`,
                input: `1`,
                pop: `X`,
                to: `q0`,
                push: `XX`
            }, {
                from: `q0`,
                input: `0`,
                pop: `X`,
                to: `q1`,
                push: `X`
            }, {
                from: `q0`,
                input: `ε`,
                pop: `Z`,
                to: `q0`,
                push: `ε`
            }, {
                from: `q1`,
                input: `1`,
                pop: `X`,
                to: `q1`,
                push: `ε`
            }, {
                from: `q1`,
                input: `0`,
                pop: `Z`,
                to: `q0`,
                push: `Z`
            }]
        }) : e === `lat13-2b` ? (s.value = `TEST_STRING`,
        u.value = `001100`,
        c.value = {
            states: [`q0`, `q1`],
            inputAlphabet: `0, 1`,
            stackAlphabet: `X, Z`,
            start: `q0`,
            z0: `Z`,
            final: [],
            transitions: [{
                from: `q0`,
                input: `1`,
                pop: `Z`,
                to: `q0`,
                push: `XZ`
            }, {
                from: `q0`,
                input: `1`,
                pop: `X`,
                to: `q0`,
                push: `XX`
            }, {
                from: `q0`,
                input: `0`,
                pop: `X`,
                to: `q1`,
                push: `X`
            }, {
                from: `q0`,
                input: `ε`,
                pop: `Z`,
                to: `q0`,
                push: `ε`
            }, {
                from: `q1`,
                input: `1`,
                pop: `X`,
                to: `q1`,
                push: `ε`
            }, {
                from: `q1`,
                input: `0`,
                pop: `Z`,
                to: `q0`,
                push: `Z`
            }]
        }) : e === `lat15-2b` && (s.value = `TEST_STRING`,
        u.value = `aab`,
        c.value = {
            states: [`q1`, `q2`, `q3`],
            inputAlphabet: `a, b`,
            stackAlphabet: `S, a, b, Z0`,
            start: `q1`,
            z0: `Z0`,
            final: [`q3`],
            transitions: [{
                from: `q1`,
                input: `ε`,
                pop: `Z0`,
                to: `q2`,
                push: `SZ0`
            }, {
                from: `q2`,
                input: `ε`,
                pop: `S`,
                to: `q2`,
                push: `aS`
            }, {
                from: `q2`,
                input: `ε`,
                pop: `S`,
                to: `q2`,
                push: `Sb`
            }, {
                from: `q2`,
                input: `ε`,
                pop: `S`,
                to: `q2`,
                push: `ε`
            }, {
                from: `q2`,
                input: `a`,
                pop: `a`,
                to: `q2`,
                push: `ε`
            }, {
                from: `q2`,
                input: `b`,
                pop: `b`,
                to: `q2`,
                push: `ε`
            }, {
                from: `q2`,
                input: `ε`,
                pop: `Z0`,
                to: `q3`,
                push: `Z0`
            }]
        })
    }
    ;
    return {
        formatPDA: e,
        pdaCfgRules: t,
        pdaCfgResult: n,
        initPDACFG: r,
        doRandomPDACFG: a,
        loadPDACFGPreset: i,
        solvePDACFG: o,
        eqType: s,
        pdaEqConfig: c,
        pdaEqResult: l,
        parsedStackAlphabet: f,
        initPDAEQ: p,
        doRandomPDAEQ: () => {
            let e = [`FS_TO_NS`, `NS_TO_FS`, `TEST_STRING`];
            s.value = e[Math.floor(Math.random() * e.length)],
            c.value = V.generateRandomEQ(s.value),
            u.value = s.value === `TEST_STRING` ? `010` : ``
        }
        ,
        loadPDAEQPreset: v,
        solvePDAEQ: () => {
            s.value === `TEST_STRING` ? (l.value = null,
            d.value = V.simulate(c.value, u.value.trim())) : (d.value = null,
            s.value === `FS_TO_NS` ? l.value = V.fsToNs(c.value) : l.value = V.nsToFs(c.value))
        }
        ,
        addEqState: m,
        removeEqState: h,
        addPDATransition: g,
        removePDATransition: _,
        targetStringEq: u,
        simulationResult: d,
        overwritePDAEQ: () => {
            l.value && (c.value = {
                states: [...l.value.Q_new],
                inputAlphabet: c.value.inputAlphabet,
                stackAlphabet: l.value.Gam_new.join(`, `),
                start: l.value.start,
                z0: `X`,
                final: l.value.final ? [l.value.final] : [],
                transitions: l.value.rawTransitions
            },
            s.value = `TEST_STRING`,
            u.value = ``,
            l.value = null,
            d.value = null,
            window.dispatchEvent(new CustomEvent(`overwrite-pda-view`)))
        }
    }
}
var W, G, K = e(( () => {
    H(),
    {ref: W, computed: G} = window.Vue
}
)), q, J = e(( () => {
    q = {
        formatSub(e) {
            return e && String(e).replace(/([a-zA-Z])(\d+)/g, `$1<sub>$2</sub>`)
        },
        simulate(e, t) {
            let n = e.blank || `b`
              , r = t === `` ? [n] : t.split(``)
              , i = 0
              , a = e.start.trim()
              , o = []
              , s = 0
              , c = 2e3
              , l = (e, t, n) => {
                let r = ``;
                for (let i = 0; i < e.length; i++)
                    i === t && (r += `<span class="bg-indigo-600 text-white px-1.5 py-0.5 rounded font-bold mx-1">${this.formatSub(n)}</span>`),
                    r += e[i];
                return t >= e.length && (r += `<span class="bg-indigo-600 text-white px-1.5 py-0.5 rounded font-bold mx-1">${this.formatSub(n)}</span>`),
                r
            }
            ;
            for (o.push({
                desc: `<b>Kondisi Awal:</b> State <b>${this.formatSub(a)}</b>, Head menunjuk elemen indeks ${i}.`,
                trace: l(r, i, a)
            }); s < c; ) {
                if (s++,
                e.final.includes(a))
                    return o.push({
                        desc: `<div class="bg-emerald-100 text-emerald-900 px-3 py-2 rounded mt-2"><b>&rArr; DITERIMA (HALT):</b> Mesin mencapai Final State (<b>${this.formatSub(a)}</b>) dan berhenti. String dikenali.</div>`
                    }),
                    {
                        accepted: !0,
                        path: o
                    };
                let t = i < r.length ? r[i] : n
                  , c = e.transitions.find(e => e.from === a && e.read === t);
                if (!c)
                    return o.push({
                        desc: `<div class="bg-red-50 text-red-800 px-3 py-2 rounded mt-2"><b>&rArr; DITOLAK (CRASH):</b> Tidak ada transisi yang mendefinisikan state <b>${this.formatSub(a)}</b> saat membaca input <b>'${t}'</b>.</div>`
                    }),
                    {
                        accepted: !1,
                        path: o,
                        reason: `Mesin terhenti secara tidak normal (Crash) karena transisi tidak ditemukan.`
                    };
                i >= r.length ? r.push(c.write) : r[i] = c.write;
                let u = a;
                if (a = c.to,
                i += c.move === `R` ? 1 : -1,
                i < 0)
                    return o.push({
                        desc: `<div class="bg-red-50 text-red-800 px-3 py-2 rounded mt-2"><b>&rArr; DITOLAK (CRASH):</b> Head bergerak ke kiri melewati batas ujung kiri pita.</div>`
                    }),
                    {
                        accepted: !1,
                        path: o,
                        reason: `Head menabrak batas kiri pita.`
                    };
                let d = c.move === `R` ? `Kanan (R)` : `Kiri (L)`;
                o.push({
                    desc: `Jalankan transisi &delta;(${this.formatSub(u)}, ${t}) = (${this.formatSub(a)}, ${c.write}, ${c.move}) <br>&rArr; Menulis <b>'${c.write}'</b> lalu head bergerak ke <b>${d}</b>.`,
                    trace: l(r, i, a)
                })
            }
            return o.push({
                desc: `<div class="bg-orange-50 text-orange-800 px-3 py-2 rounded mt-2"><b>&rArr; DITOLAK (LOOPING):</b> Mesin dihentikan paksa karena telah melakukan ${c} langkah tanpa mencapai final state.</div>`
            }),
            {
                accepted: !1,
                path: o,
                reason: `Infinite Looping terdeteksi.`
            }
        },
        combine(e, t) {
            let n = [...new Set([...e.states, ...t.states])]
              , r = e.start
              , i = t.final
              , a = [...new Set([...e.inputAlphabet, ...t.inputAlphabet])]
              , o = [...new Set([...e.tapeAlphabet, ...t.tapeAlphabet])]
              , s = e.blank || `b`
              , c = []
              , l = [];
            l.push(`<div class="font-bold text-lime-900 border-b border-lime-200 pb-2 mb-2">1. Penggabungan Himpunan (Union)</div>Pada proses kombinasi Mesin Turing (M<sub>3</sub> = M<sub>1</sub> + M<sub>2</sub>), mesin gabungan mewarisi seluruh elemen dari kedua mesin dengan aturan spesifik:<br>
        &bull; <b>State (Q<sub>3</sub>)</b> = Q<sub>1</sub> &cup; Q<sub>2</sub><br>
        &bull; <b>State Awal (S<sub>3</sub>)</b> = Menjadikan State Awal M<sub>1</sub> (<b>${this.formatSub(r)}</b>) sebagai gerbang masuk pertama.<br>
        &bull; <b>State Akhir (F<sub>3</sub>)</b> = Menjadikan State Akhir M<sub>2</sub> ({ <b>${i.map(e => this.formatSub(e)).join(`, `)}</b> }) sebagai titik akhir penyelesaian komputasi mesin gabungan.`);
            let u = [];
            return t.transitions.forEach(e => c.push({
                ...e
            })),
            e.transitions.forEach(n => {
                e.final.includes(n.to) ? (c.push({
                    ...n,
                    to: t.start
                }),
                u.push(`&delta;<sub>1</sub>(<span class="text-slate-500 font-bold">${this.formatSub(n.from)}</span>, <b>${n.read}</b>) &rarr; dialihkan menuju <b>${this.formatSub(t.start)}</b> (Awal M<sub>2</sub>).`)) : c.push({
                    ...n
                })
            }
            ),
            l.push(`<div class="font-bold text-lime-900 border-b border-lime-200 pb-2 mb-2 mt-4">2. Pembentukan Transisi Mesin Gabungan (&delta;<sub>3</sub>)</div>
        <b>Prinsip Estafet (Bridging):</b> Agar mesin M<sub>1</sub> dapat meneruskan komputasinya ke M<sub>2</sub>, setiap transisi pada M<sub>1</sub> yang sedianya menuju ke Final State M<sub>1</sub> (<b>${e.final.map(e => this.formatSub(e)).join(`, `)}</b>) akan dialihkan/dibelokkan untuk langsung menuju ke State Awal M<sub>2</sub> (<b>${this.formatSub(t.start)}</b>). Final State M<sub>1</sub> kini tidak lagi berfungsi sebagai pemberhenti.<br><br>
        &bull; Menyalin 100% fungsi transisi dari M<sub>2</sub> ke dalam M<sub>3</sub> tanpa ada perubahan.<br>
        &bull; Menyalin transisi M<sub>1</sub> yang <b>tidak</b> mengarah ke Final State M<sub>1</sub> secara utuh.<br>
        &bull; <span class="text-emerald-700 font-bold">Penyambungan Transisi (Bridge):</span><div class="mt-2 text-sm bg-white p-3 border border-emerald-100 rounded-lg shadow-sm font-mono space-y-1">${u.length > 0 ? u.join(`<br>`) : `<i>Tidak ada transisi M1 yang menuju final state-nya.</i>`}</div>`),
            {
                tm3: {
                    states: n,
                    inputAlphabet: a.join(`, `),
                    tapeAlphabet: o.join(`, `),
                    start: r,
                    final: i,
                    blank: s,
                    transitions: c
                },
                details: l
            }
        },
        generateRandom() {
            let e = [[`q0`, `q1`, `q2`], [`p0`, `p1`, `p2`]]
              , t = [`a, b`, `0, 1`]
              , n = e[Math.floor(Math.random() * e.length)]
              , r = t[Math.floor(Math.random() * t.length)]
              , i = [...r.split(`,`).map(e => e.trim()), `X`, `Y`, `b`]
              , a = Math.floor(Math.random() * 4) + 4
              , o = [];
            for (let e = 0; e < a; e++)
                o.push({
                    from: n[Math.floor(Math.random() * n.length)],
                    read: i[Math.floor(Math.random() * i.length)],
                    to: n[Math.floor(Math.random() * n.length)],
                    write: i[Math.floor(Math.random() * i.length)],
                    move: Math.random() > .5 ? `R` : `L`
                });
            return o = o.filter( (e, t, n) => n.findIndex(t => t.from === e.from && t.read === e.read) === t),
            {
                states: n,
                inputAlphabet: r,
                tapeAlphabet: i.join(`, `),
                start: n[0],
                final: [n[n.length - 1]],
                blank: `b`,
                transitions: o
            }
        }
    }
}
));
function Y() {
    let e = e => q.formatSub(e)
      , t = X({
        states: [`q0`, `q1`, `q2`, `q3`, `q4`],
        inputAlphabet: `0, 1`,
        tapeAlphabet: `0, 1, X, Y, b`,
        start: `q0`,
        final: [`q4`],
        blank: `b`,
        transitions: []
    })
      , n = X(``)
      , r = X(null)
      , i = () => {
        l(`lat14-1b`)
    }
      , a = () => {
        let e = 0;
        for (; t.value.states.includes(`q${e}`); )
            e++;
        t.value.states.push(`q${e}`)
    }
      , o = e => {
        t.value.states.length <= 1 || (t.value.states = t.value.states.filter(t => t !== e),
        t.value.start === e && (t.value.start = t.value.states[0]),
        t.value.final = t.value.final.filter(t => t !== e),
        t.value.transitions = t.value.transitions.filter(t => t.from !== e && t.to !== e))
    }
      , s = () => {
        t.value.transitions.push({
            from: t.value.states[0] || ``,
            read: ``,
            to: t.value.states[0] || ``,
            write: ``,
            move: `R`
        })
    }
      , c = e => {
        t.value.transitions.splice(e, 1)
    }
      , l = e => {
        let r = {
            states: [`q1`, `q2`, `q3`, `q4`],
            inputAlphabet: `a`,
            tapeAlphabet: `a, b`,
            start: `q1`,
            final: [`q4`],
            blank: `b`,
            transitions: [{
                from: `q1`,
                read: `a`,
                to: `q2`,
                write: `a`,
                move: `R`
            }, {
                from: `q1`,
                read: `b`,
                to: `q2`,
                write: `b`,
                move: `R`
            }, {
                from: `q2`,
                read: `a`,
                to: `q3`,
                write: `a`,
                move: `R`
            }, {
                from: `q2`,
                read: `b`,
                to: `q2`,
                write: `b`,
                move: `L`
            }, {
                from: `q3`,
                read: `a`,
                to: `q4`,
                write: `a`,
                move: `R`
            }, {
                from: `q3`,
                read: `b`,
                to: `q4`,
                write: `b`,
                move: `R`
            }]
        }
          , i = {
            states: [`q0`, `q1`, `q2`, `q3`],
            inputAlphabet: `a, b`,
            tapeAlphabet: `a, b, B`,
            start: `q0`,
            final: [`q2`],
            blank: `B`,
            transitions: [{
                from: `q0`,
                read: `a`,
                to: `q1`,
                write: `a`,
                move: `R`
            }, {
                from: `q0`,
                read: `b`,
                to: `q0`,
                write: `b`,
                move: `R`
            }, {
                from: `q0`,
                read: `B`,
                to: `q2`,
                write: `B`,
                move: `R`
            }, {
                from: `q1`,
                read: `a`,
                to: `q0`,
                write: `a`,
                move: `R`
            }, {
                from: `q1`,
                read: `b`,
                to: `q1`,
                write: `b`,
                move: `R`
            }, {
                from: `q1`,
                read: `B`,
                to: `q3`,
                write: `B`,
                move: `R`
            }]
        }
          , a = null;
        e.startsWith(`lat14`) ? (a = JSON.parse(JSON.stringify(r)),
        e === `lat14-1a` ? n.value = `a` : e === `lat14-1b` ? n.value = `aa` : e === `lat14-1c` ? n.value = `aaa` : e === `lat14-1d` && (n.value = `aaaa`)) : e.startsWith(`lat15`) && (a = JSON.parse(JSON.stringify(i)),
        e === `lat15-a` ? n.value = `aba` : e === `lat15-b` ? n.value = `abaab` : e === `lat15-c` && (n.value = `aabbaa`)),
        a && (t.value.states = a.states,
        t.value.inputAlphabet = a.inputAlphabet,
        t.value.tapeAlphabet = a.tapeAlphabet,
        t.value.start = a.start,
        t.value.final = a.final,
        t.value.blank = a.blank,
        t.value.transitions = [],
        Z( () => {
            t.value.transitions = a.transitions
        }
        ))
    }
      , u = () => {
        let e = q.generateRandom();
        t.value.states = e.states,
        t.value.inputAlphabet = e.inputAlphabet,
        t.value.tapeAlphabet = e.tapeAlphabet,
        t.value.start = e.start,
        t.value.final = e.final,
        t.value.blank = e.blank,
        t.value.transitions = [],
        Z( () => {
            t.value.transitions = e.transitions
        }
        ),
        n.value = `aab`
    }
      , d = () => {
        r.value = q.simulate(t.value, n.value.trim())
    }
      , f = X({
        states: [`q1`, `q2`],
        inputAlphabet: `a`,
        tapeAlphabet: `a, b`,
        start: `q1`,
        final: [`q2`],
        blank: `b`,
        transitions: []
    })
      , p = X({
        states: [`p1`, `p2`],
        inputAlphabet: `a`,
        tapeAlphabet: `a, b`,
        start: `p1`,
        final: [`p2`],
        blank: `b`,
        transitions: []
    })
      , m = X(null)
      , h = () => {
        g(`lat14-combine`)
    }
      , g = e => {
        if (e === `lat14-combine`) {
            let e = {
                states: [`q1`, `q2`, `q3`, `q4`],
                inputAlphabet: `a`,
                tapeAlphabet: `a, b`,
                start: `q1`,
                final: [`q4`],
                blank: `b`,
                transitions: [{
                    from: `q1`,
                    read: `a`,
                    to: `q2`,
                    write: `a`,
                    move: `R`
                }, {
                    from: `q1`,
                    read: `b`,
                    to: `q2`,
                    write: `b`,
                    move: `R`
                }, {
                    from: `q2`,
                    read: `a`,
                    to: `q3`,
                    write: `a`,
                    move: `R`
                }, {
                    from: `q2`,
                    read: `b`,
                    to: `q2`,
                    write: `b`,
                    move: `L`
                }, {
                    from: `q3`,
                    read: `a`,
                    to: `q4`,
                    write: `a`,
                    move: `R`
                }, {
                    from: `q3`,
                    read: `b`,
                    to: `q4`,
                    write: `b`,
                    move: `R`
                }]
            }
              , t = {
                states: [`p1`, `p2`],
                inputAlphabet: `a`,
                tapeAlphabet: `a, b`,
                start: `p1`,
                final: [`p2`],
                blank: `b`,
                transitions: [{
                    from: `p1`,
                    read: `a`,
                    to: `p2`,
                    write: `a`,
                    move: `R`
                }, {
                    from: `p1`,
                    read: `b`,
                    to: `p2`,
                    write: `a`,
                    move: `L`
                }]
            };
            f.value.states = e.states,
            f.value.inputAlphabet = e.inputAlphabet,
            f.value.tapeAlphabet = e.tapeAlphabet,
            f.value.start = e.start,
            f.value.final = e.final,
            f.value.blank = e.blank,
            p.value.states = t.states,
            p.value.inputAlphabet = t.inputAlphabet,
            p.value.tapeAlphabet = t.tapeAlphabet,
            p.value.start = t.start,
            p.value.final = t.final,
            p.value.blank = t.blank,
            f.value.transitions = [],
            p.value.transitions = [],
            Z( () => {
                f.value.transitions = e.transitions,
                p.value.transitions = t.transitions
            }
            )
        }
    }
    ;
    return {
        formatTuring: e,
        tmSimConfig: t,
        tmSimString: n,
        tmSimResult: r,
        initTMSim: i,
        addTMSimState: a,
        removeTMSimState: o,
        addTMSimTrans: s,
        removeTMSimTrans: c,
        loadTMSimPreset: l,
        doRandomTMSim: u,
        solveTMSim: d,
        tmCombine1: f,
        tmCombine2: p,
        tmCombineResult: m,
        initTMCombine: h,
        loadTMCombinePreset: g,
        doRandomTMCombine: () => {
            let e = q.generateRandom()
              , t = q.generateRandom();
            t.states = t.states.map(e => e.replace(/q/g, `p`)),
            t.start = t.start.replace(/q/g, `p`),
            t.final = t.final.map(e => e.replace(/q/g, `p`)),
            t.transitions = t.transitions.map(e => ({
                ...e,
                from: e.from.replace(/q/g, `p`),
                to: e.to.replace(/q/g, `p`)
            })),
            f.value.states = e.states,
            f.value.inputAlphabet = e.inputAlphabet,
            f.value.tapeAlphabet = e.tapeAlphabet,
            f.value.start = e.start,
            f.value.final = e.final,
            f.value.blank = e.blank,
            p.value.states = t.states,
            p.value.inputAlphabet = t.inputAlphabet,
            p.value.tapeAlphabet = t.tapeAlphabet,
            p.value.start = t.start,
            p.value.final = t.final,
            p.value.blank = t.blank,
            f.value.transitions = [],
            p.value.transitions = [],
            Z( () => {
                f.value.transitions = e.transitions,
                p.value.transitions = t.transitions
            }
            )
        }
        ,
        solveTMCombine: () => {
            m.value = q.combine(f.value, p.value)
        }
        ,
        overwriteTuring: () => {
            m.value && (t.value.states = [...m.value.tm3.states],
            t.value.inputAlphabet = m.value.tm3.inputAlphabet,
            t.value.tapeAlphabet = m.value.tm3.tapeAlphabet,
            t.value.start = m.value.tm3.start,
            t.value.final = [...m.value.tm3.final],
            t.value.blank = m.value.tm3.blank,
            t.value.transitions = [],
            Z( () => {
                t.value.transitions = [...m.value.tm3.transitions]
            }
            ),
            n.value = `aaaa`,
            r.value = null,
            window.dispatchEvent(new CustomEvent(`overwrite-turing-view`)))
        }
    }
}
var X, Z, Q = e(( () => {
    J(),
    {ref: X, nextTick: Z} = window.Vue
}
));
t(( () => {
    s(),
    f(),
    v(),
    C(),
    O(),
    N(),
    B(),
    K(),
    Q();
    var e = () => {
        let e = new Date().getTime()
          , t = new Date(`2026-06-22T08:05:00+07:00`).getTime()
          , n = new Date(`2026-06-22T09:50:00+07:00`).getTime();
        e >= t && e <= n && (document.cookie = `tba_agreed=; max-age=0; path=/`,
        window.location.href = `index.html`)
    }
    ;
    e(),
    setInterval(e, 1e4);
    var {createApp: t, ref: n, nextTick: r, onMounted: a, onUnmounted: o} = window.Vue;
    t({
        setup() {
            let e = n(`MENU`)
              , t = n(!1)
              , s = i()
              , c = u()
              , l = h()
              , d = x()
              , f = E()
              , p = j()
              , m = R()
              , g = U()
              , _ = Y()
              , v = {}
              , y = {}
              , b = () => {
                e.value = `PDA_EQ_SETUP`
            }
              , S = () => {
                e.value = `TURING_SIM_SETUP`
            }
            ;
            a( () => {
                window.addEventListener(`overwrite-pda-view`, b),
                window.addEventListener(`overwrite-turing-view`, S)
            }
            ),
            o( () => {
                window.removeEventListener(`overwrite-pda-view`, b),
                window.removeEventListener(`overwrite-turing-view`, S)
            }
            );
            let C = (e, t, n=!1) => {
                let r = n ? `#a5b4fc` : `#d8b4fe`
                  , i = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">`;
                i += `<rect x="0" y="0" width="100" height="100" fill="#1d2129"/>`,
                t && (i += `<circle cx="50" cy="50" r="38" stroke="${r}" stroke-width="3" fill="none"/>`);
                let a = e.match(/^([a-zA-Z]+)_?([0-9]+)$/)
                  , o = a ? `${a[1]}<tspan dy="6" font-size="20">${a[2]}</tspan>` : e
                  , s = e.length > 3 ? 20 : 28;
                return i += `<text x="50" y="58" font-family="monospace" font-size="${s}" font-weight="bold" text-anchor="middle" fill="${r}">${o}</text>`,
                i += `</svg>`,
                `data:image/svg+xml;charset=utf-8,` + encodeURIComponent(i)
            }
              , w = (e, t, n=!1, r=0) => {
                let i = document.getElementById(e);
                if (!i) {
                    r < 15 && setTimeout( () => w(e, t, n, r + 1), 50);
                    return
                }
                let a = e === `reg2fsa-network`
                  , o = t.states.length
                  , s = t.start
                  , c = t.states.map( (e, r) => {
                    let i = t.final.includes(e)
                      , c = 0
                      , l = 0;
                    if (n && y[e])
                        c = y[e].x,
                        l = y[e].y;
                    else {
                        let e = r / o * 2 * Math.PI;
                        c = 150 * Math.cos(e),
                        l = 150 * Math.sin(e)
                    }
                    return {
                        id: e,
                        x: c,
                        y: l,
                        shape: `circularImage`,
                        image: C(e, i, a),
                        size: 48,
                        color: {
                            border: a ? `#a5b4fc` : `#d8b4fe`,
                            background: e === s ? a ? `#2d2f55` : `#3a2a55` : `#1d2129`
                        },
                        borderWidth: 2
                    }
                }
                )
                  , l = new window.vis.DataSet(c)
                  , u = {};
                t.transitions.forEach(e => {
                    let t = `${e.from}->${e.to}`;
                    u[t] || (u[t] = {
                        from: e.from,
                        to: e.to,
                        labels: new Set
                    }),
                    e.label.split(`,`).map(e => e.trim()).filter(e => e !== ``).forEach(e => u[t].labels.add(e))
                }
                );
                let d = Object.values(u).map( (e, t) => {
                    let n = e.from === e.to
                      , r = {
                        id: `e${t}`,
                        from: e.from,
                        to: e.to,
                        label: Array.from(e.labels).sort().join(`, `),
                        arrows: `to`,
                        color: {
                            color: `#4b5366`,
                            highlight: a ? `#818cf8` : `#c084fc`
                        },
                        width: 2,
                        font: {
                            size: 16,
                            color: `#e2e6f0`,
                            bold: !0,
                            background: `rgba(29,33,41,0.9)`,
                            strokeWidth: 0,
                            align: `top`,
                            vadjust: n ? -12 : 0
                        }
                    };
                    return n || (r.smooth = {
                        type: `curvedCW`,
                        roundness: .2
                    }),
                    r
                }
                )
                  , f = new window.vis.DataSet(d)
                  , p = {
                    physics: !1,
                    interaction: {
                        hover: !0,
                        dragNodes: !0,
                        selectConnectedEdges: !1
                    },
                    edges: {
                        arrowStrikethrough: !1,
                        selfReference: {
                            size: 25,
                            angle: -Math.PI / 2
                        }
                    }
                };
                v[e] && v[e].destroy();
                let m = new window.vis.Network(i,{
                    nodes: l,
                    edges: f
                },p);
                v[e] = m,
                m.on(`afterDrawing`, function(e) {
                    let t = m.getPositions([s]);
                    if (t && t[s]) {
                        let {x: n, y: r} = t[s];
                        e.beginPath(),
                        e.moveTo(n - 48 - 35, r),
                        e.lineTo(n - 48 - 2, r),
                        e.strokeStyle = a ? `#818cf8` : `#c084fc`,
                        e.lineWidth = 4,
                        e.stroke(),
                        e.beginPath(),
                        e.moveTo(n - 48 - 2, r),
                        e.lineTo(n - 48 - 14, r - 8),
                        e.lineTo(n - 48 - 14, r + 8),
                        e.fillStyle = a ? `#818cf8` : `#c084fc`,
                        e.fill()
                    }
                }),
                m.on(`dragEnd`, () => {
                    y = m.getPositions()
                }
                ),
                y = m.getPositions(),
                m.fit()
            }
              , T = (e, t, n=0) => {
                let r = document.getElementById(e);
                if (!r) {
                    n < 20 && setTimeout( () => T(e, t, n + 1), 50);
                    return
                }
                if (!t)
                    return;
                let i = new window.vis.DataSet(t.nodes.map(e => ({
                    id: e.id,
                    label: e.label,
                    shape: e.isVar ? `circle` : `box`,
                    color: e.isVar ? {
                        background: `#2d2f55`,
                        border: `#818cf8`
                    } : {
                        background: `#242937`,
                        border: `#4b5366`
                    },
                    font: {
                        size: 18,
                        bold: !0,
                        color: e.isVar ? `#c7d2fe` : `#cbd5e1`
                    },
                    borderWidth: 2,
                    size: 20
                })))
                  , a = new window.vis.DataSet(t.edges.map(e => ({
                    from: e.from,
                    to: e.to,
                    arrows: ``,
                    color: `#4b5366`,
                    width: 2,
                    smooth: {
                        type: `cubicBezier`,
                        forceDirection: `vertical`,
                        roundness: .5
                    }
                })));
                v[e] && v[e].destroy(),
                v[e] = new window.vis.Network(r,{
                    nodes: i,
                    edges: a
                },{
                    layout: {
                        hierarchical: {
                            direction: `UD`,
                            sortMethod: `directed`,
                            levelSeparation: 70,
                            nodeSpacing: 60
                        }
                    },
                    physics: !1,
                    interaction: {
                        dragNodes: !0,
                        zoomView: !0,
                        dragView: !0
                    }
                })
            }
              , D = () => {
                e.value = `MENU`
            }
              , O = () => {
                e.value = `FSA_VIEW`,
                t.value = !1,
                s.randomizeFSA(),
                w(`fsa-network`, s.fsa.value, !1)
            }
              , k = () => {
                s.randomizeFSA(),
                y = {},
                t.value = !1,
                w(`fsa-network`, s.fsa.value, !1)
            }
              , A = () => {
                w(`fsa-network`, s.fsa.value, !0)
            }
              , M = e => {
                s.loadPreset(e),
                y = {},
                t.value = !1,
                w(`fsa-network`, s.fsa.value, !1)
            }
              , N = () => {
                e.value = `REG2FSA_VIEW`,
                t.value = !1,
                l.randomizeReg()
            }
              , P = () => {
                t.value = !0,
                r( () => w(`reg2fsa-network`, l.parsedFSA.value, !1))
            }
              , F = e => {
                l.loadPreset(e),
                y = {},
                t.value = !1
            }
              , I = () => {
                e.value = `CFG_SETUP`,
                c.initCFG()
            }
              , L = () => {
                c.solveCFG(),
                e.value = `CFG_REVIEW`
            }
              , z = () => {
                e.value = `DERIVATION_SETUP`,
                d.initDerivation()
            }
              , B = () => {
                d.solveDerivation().then(t => {
                    e.value = `DERIVATION_REVIEW`,
                    t && (t.success || t.isFallback) && (T(`tree-network-leftmost`, t.leftTree),
                    T(`tree-network-rightmost`, t.rightTree),
                    t.isAmbiguous && T(`tree-network-alt`, t.altTree))
                }
                )
            }
              , V = () => {
                e.value = `CNF_SETUP`,
                f.initCNF()
            }
              , H = () => {
                f.solveCNF(),
                e.value = `CNF_REVIEW`
            }
              , W = () => {
                e.value = `LEFTREC_SETUP`,
                p.initLR()
            }
              , G = () => {
                p.solveLR(),
                e.value = `LEFTREC_REVIEW`
            }
              , K = () => {
                e.value = `GNF_SETUP`,
                m.initGNF()
            }
              , q = t => {
                m.solveGNF(t),
                e.value = `GNF_REVIEW`
            }
              , J = () => {
                e.value = `PDA_CFG_SETUP`,
                g.initPDACFG()
            }
              , X = () => {
                g.solvePDACFG(),
                e.value = `PDA_CFG_REVIEW`
            }
              , Z = () => {
                e.value = `PDA_EQ_SETUP`,
                g.initPDAEQ()
            }
              , Q = () => {
                g.solvePDAEQ(),
                e.value = `PDA_EQ_REVIEW`
            }
              , $ = () => {
                e.value = `TURING_SIM_SETUP`,
                _.initTMSim()
            }
              , ee = () => {
                _.solveTMSim(),
                e.value = `TURING_SIM_REVIEW`
            }
              , te = () => {
                e.value = `TURING_COMBINE_SETUP`,
                _.initTMCombine()
            }
              , ne = () => {
                _.solveTMCombine(),
                e.value = `TURING_COMBINE_REVIEW`
            }
            ;
            return {
                gameState: e,
                goToMenu: D,
                showExplanation: t,
                highlightState: (e, t) => {
                    let n = v[e];
                    if (n) {
                        let r = n.body.data.edges;
                        if (r) {
                            let i = new Set([t])
                              , a = new Set
                              , o = [t]
                              , s = new Set([t])
                              , c = e === `reg2fsa-network`
                              , u = [];
                            for (c && l.parsedFSA.value.varMap && (u = Object.values(l.parsedFSA.value.varMap)); o.length > 0; ) {
                                let e = o.shift();
                                n.getConnectedEdges(e).filter(t => {
                                    let n = r.get(t);
                                    return n && n.from === e
                                }
                                ).forEach(e => {
                                    a.add(e);
                                    let t = r.get(e).to;
                                    c && (i.add(t),
                                    !u.includes(t) && !s.has(t) && (s.add(t),
                                    o.push(t)))
                                }
                                )
                            }
                            n.setSelection({
                                nodes: Array.from(i),
                                edges: Array.from(a)
                            }, {
                                unselectAll: !0
                            })
                        } else
                            n.selectNodes([t], !0)
                    }
                }
                ,
                resetHighlight: e => {
                    v[e] && v[e].unselectAll()
                }
                ,
                ...s,
                fsaExplanations: s.fsaExplanations,
                goToFSA: O,
                doRandomFSA: k,
                updateFSAGraph: A,
                loadFSAPreset: M,
                ...l,
                goToReg2FSA: N,
                showRegGraph: P,
                loadRegPreset: F,
                ...c,
                goToCFG: I,
                simplifyCFG: L,
                doRandomCFG: c.doRandomCFG,
                loadCFGPreset: c.loadCFGPreset,
                ...d,
                goToDerivation: z,
                solveDerivation: B,
                doRandomDerivation: d.doRandomDerivation,
                loadDerivationPreset: d.loadDerivationPreset,
                ...f,
                goToCNF: V,
                solveCNF: H,
                doRandomCNF: f.doRandomCNF,
                loadCNFPreset: f.loadCNFPreset,
                ...p,
                goToLeftRec: W,
                solveLR: G,
                doRandomLR: p.doRandomLR,
                loadLRPreset: p.loadLRPreset,
                ...m,
                goToGNF: K,
                solveGNF: q,
                doRandomGNF: m.doRandomGNF,
                loadGNFPreset: m.loadGNFPreset,
                ...g,
                goToPDACFG: J,
                solvePDACFG: X,
                doRandomPDACFG: g.doRandomPDACFG,
                loadPDACFGPreset: g.loadPDACFGPreset,
                goToPDAEQ: Z,
                solvePDAEQ: Q,
                doRandomPDAEQ: g.doRandomPDAEQ,
                loadPDAEQPreset: g.loadPDAEQPreset,
                addEqState: g.addEqState,
                removeEqState: g.removeEqState,
                addPDATransition: g.addPDATransition,
                removePDATransition: g.removePDATransition,
                formatPDA: g.formatPDA,
                ..._,
                goToTuringSim: $,
                solveTMSim: ee,
                doRandomTMSim: _.doRandomTMSim,
                loadTMSimPreset: _.loadTMSimPreset,
                goToTuringCombine: te,
                solveTMCombine: ne,
                loadTMCombinePreset: _.loadTMCombinePreset,
                formatTuring: _.formatTuring
            }
        }
    }).mount(`#app`)
}
))();