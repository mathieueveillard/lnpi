import React, { Component } from 'react';
import './App.css';

import TeX from './tex/TeX.js';

class App extends Component {

  render() {
    return (

      <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header mdl-layout__header--transparent">
          <div className="mdl-layout-icon"></div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Ln(Pi)</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="#hypotheses">Hypothèses</a>
            <a className="mdl-navigation__link" href="#method">Méthode</a>
            <a className="mdl-navigation__link" href="#pi">Approximation de Pi</a>
            <a className="mdl-navigation__link" href="#lnpi">Approximation de Ln(Pi)</a>
            <a className="mdl-navigation__link" href="#fraction">Fraction continue</a>
            <a className="mdl-navigation__link" href="#rational">Forme rationnelle</a>
            <a className="mdl-navigation__link" href="#error">Mesure d'erreur</a>
            <a className="mdl-navigation__link" href="#complexity">Complexité</a>
            <a className="mdl-navigation__link" href="#implementation">Implémentation</a>
            <a className="mdl-navigation__link" href="#result">Résultat</a>
          </nav>
        </div>
        <main className="mdl-layout__content">

          <div className="App mdl-grid">

            <div className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h1>Ln(Pi)</h1>
              <h6>Trouver la meilleure approximation de <TeX value={`$ln(\\pi)$`}/> sous forme rationnelle <TeX value={`$P/Q$`}/><br/>
              avec <TeX value={`$P$`}/> et <TeX value={`$Q$`}/> ayant tous les deux maximum 20 chiffres</h6>
            </div>

            <div className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h4>tl;dr</h4>
              <p>
                On estime <TeX value={`$\\pi$`}/> à l'aide de la formule de Leibniz.
                Le logarithme népérien de <TeX value={`$\\pi$`}/>, égal à l'aire sous la courbe de la fonction <TeX value={`$ x \\to 1/x $`}/> entre les abscisses <TeX value={`$1$`}/> et <TeX value={`$\\pi$`}/>,
                est ensuite approché par la formule de Simpson.
                Le nombre réel ainsi obtenu est enfin estimé grâce à une réduite de sa fraction continue, convertie en quotient de deux nombres entiers.
              </p>
            </div>

            <div className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h4>Sommaire</h4>
              <p>
                <a href="#hypotheses">Hypothèses</a><br/>
                <a href="#method">Recherche d'une méthode</a><br/>
                <a href="#pi">Approximation de Pi</a><br/>
                <a href="#lnpi">Approximation de Ln(Pi)</a><br/>
                <a href="#fraction">Passage en fraction continue</a><br/>
                <a href="#rational">Ecriture sous forme rationnelle</a><br/>
                <a href="#error">Mesure d'erreur</a><br/>
                <a href="#complexity">Complexité</a><br/>
                <a href="#implementation">Implémentation</a><br/>
                <a href="#result">Résultat</a><br/>
              </p>
            </div>

            <div id="hypotheses" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h4>Hypothèses</h4>
              <p>
                Confronté à une problématique de ce type, l'ingénieur vise à l'efficacité et son premier réflexe serait de réutiliser
                l'existant. <TeX value={`$\\pi$`}/>, <TeX value={`$ln(\\pi)$`}/> et même <TeX value={`$ln(pi) \\sim P/Q$`}/> satisfaisant
                les conditions de l'énoncé sont directement disponibles dans la plupart des langages de programmation intégrant un module de
                calculs mathématiques.
              </p>
              <p>
                Pourtant, nous ferons l'hypothèse ici que ni <TeX value={`$\\pi$`}/> ni la fonction <TeX value={`$x \\in \\mathbb{R}_+^* \\to ln(x)$`}/> ne sont accessibles,
                de sorte qu'il va falloir les calculer. En effet, dans le cas contraire, le sujet serait équivalent à "trouver la meilleure
                approximation de tout nombre réel <TeX value={`$x$`}/> sous forme rationnelle <TeX value={`$P/Q$`}/> avec <TeX value={`$P$`}/> et <TeX value={`$Q$`}/> ayant tous les deux maximum 20 chiffres".
                Une autre raison à cela est que nous avons besoin de connaître la précision atteinte dans le calcul de <TeX value={`$ln(\\pi)$`}/>, car
                rien ne sert d'élaborer un algorithme compliqué permettant d'approximer <TeX value={`$ln(\\pi)$`}/> par un nombre rationnel n'augmentant
                pas l'erreur si cette erreur est inconnue à la base !
              </p>
              <p>
                Nous ferons de même l'hypothèse qu'aucune fonction n'est disponible qui fournirait l'approximation d'un nombre réel sous
                forme rationnelle (Cf. <a href="#implementation">implémentation</a>).
              </p>
            </div>

            <div id="method" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h4>Recherche d'une méthode</h4>
              <p>
                Différentes pistes ont été étudiées pour apporter réponse à ce problème. L'une d'elles repose sur
                la <a href="https://fr.wikipedia.org/wiki/M%C3%A9thode_de_Monte-Carlo#D.C3.A9termination_de_la_superficie_d.27un_lac">méthode de Monte-Carlo</a>, 
                que l'on pourrait utiliser aussi bien pour la détermination de <TeX value={`$\\pi$`}/> que celle de <TeX value={`$ln(\\pi)$`}/>.
                On obtiendrait en particulier une approximation <TeX value={`$ln(\\pi) \\sim P/Q$`}/> avec <TeX value={`$Q$`}/> le nombre total de lancers
                et <TeX value={`$P$`}/> le nombre de lancers que le hasard localise dans la surface située sous la courbe de la fonction inverse entre 
                les abscisses <TeX value={`$1$`}/> et <TeX value={`$\\pi$`}/>. Cela implique que pour obtenir 20 chiffres significatifs, il faut <TeX value={`$10^{20}$`}/> tirages...
                Il serait envisageable de distribuer le calcul à l'aide d'un algorithme <a href="https://fr.wikipedia.org/wiki/MapReduce">MapReduce</a>,
                la parallélisation se faisant sur le nombre de lancers, mais cela reste une débauche d'énergie et nous pouvons élaborer
                une méthode bien mieux adaptée à ce contexte.
              </p>
            </div>

            <div id="pi" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h4>Approximation de Pi</h4>
              <p>
                L'approximation de <TeX value={`$\\pi$`}/> proposée ici repose sur la formule de Leibniz (1), série convergente de termes alternativement positifs et négatifs.
                Cependant, sa vitesse de convergence est faible (plus de 200 termes sont nécessaires pour une précision à la deuxième décimale),
                de sorte que nous allons lui préférer une approximation basée sur la suite (2), dont les termes de rang 0 sont ceux de la suite de Leibniz
                et dont chaque terme de rang supérieur est la moyenne des 2 termes de rang inférieur :
              </p>

              <div>(1)
                  <TeX value={
                    `$$
                      \\pi = 4 \\sum_{k=0}^{\\infty}{\\frac{(-1)^k}{2k+1}}
                    $$`
                  }/>
              </div>
              <div>(2)
                  <TeX value={
                    `$$
                        \\begin{matrix}
                          \\forall j \\in \\mathbb{N}^*, \\pi_{0,j} = 4 \\sum_{k=0}^{j-1}{\\frac{(-1)^k}{2k+1}} \\\\
                          \\forall (i,j) \\in (\\mathbb{N}^*)^2, \\pi_{i,j} = \\frac{\\pi_{i-1,j} + \\pi_{i-1,j+1}}{2}
                        \\end{matrix}
                    $$`
                  }/>
              </div>
              
              <br/><br/>

              <p>
                L'approche naïve du calcul du terme <span className="code">Pi(i,j)</span> par récurrence n'est pas optimale
                car elle conduit à calculer plusieurs fois certains termes. En effet, le terme <span className="code">Pi(i-2,j+1)</span> 
                intervient à la fois dans le calcul de <span className="code">Pi(i-1,j)</span> (terme <span className="code">Pi(i-1-1,j+1)</span>)
                et dans le calcul du terme <span className="code">Pi(i-1,j+1)</span> (terme <span className="code">Pi(i-1-1,j+1)</span>), 
                tous deux nécessaires au calcul du terme <span className="code">Pi(i,j)</span>. Pour cette raison,
                il est préférable de construire la suite par empilement, en partant des termes de rang 0 pour arriver au terme souhaité.
              </p>

              <br/><br/>

            </div>

            <div id="lnpi" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h4>Approximation de Ln(Pi)</h4>
              <p>
                La fonction logarithme népérien est la primitive définie sur les réels strictement positifs de la fonction inverse <TeX value={`$ x \\to 1/x $`}/> (3).
                La fonction inverse étant continue et positive pour tout <TeX value={`$x$`}/> réel positif, <TeX value={`$ln(x)$`}/> est l'aire sous la courbe de la fonction inverse entre les abscisses 1 et <TeX value={`$x$`}/>.
                Nous proposons d'approcher cette aire par la <a href="https://fr.wikipedia.org/wiki/Calcul_num%C3%A9rique_d%27une_int%C3%A9grale#Formules_du_rectangle_et_du_point_milieu">formule de Simpson</a> (4).
              </p>

              <div>(3)
                  <TeX value={
                    `$$
                      \\forall x \\in \\mathbb{R}_{+}^*, ln(x) = \\int_{1}^{x}{\\frac{1}{t}dt}
                    $$`
                  }/>
              </div>

              <div className="resize"><img src="./LnxAire.png" alt="Ln aire sous la courbe de x->1/x"/></div>

              <div>(4)
                  <TeX value={
                    `$$
                      \\forall x \\in \\mathbb{R} / x \\ge 1,
                      \\forall N \\in \\mathbb{N}^*,
                      x_{N} = \\frac{x-1}{6N} \\sum_{k=0}^{N}{
                        \\frac{1}{1+k\\frac{x-1}{N}}
                        + \\frac{8}{(1+k\\frac{x-1}{N})+(1+(k+1)\\frac{x-1}{N})}
                        + \\frac{1}{1+(k+1)\\frac{x-1}{N}}
                      }
                    $$`
                  }/>
              </div>

              <br/><br/>

            </div>

            <div id="fraction" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h4>Passage en fraction continue</h4>
              <p>Pour tout réel positif <TeX value={`$x$`}/>, on définit conjointement 2 suites (5) :</p>
              <ul>
                <li>Suite <TeX value={`$(x_i)$`}/> des quotients complets de <TeX value={`$x$`}/> d'ordre <TeX value={`$i$`}/></li>
                <li>
                  Suite <TeX value={`$(a_i)$`}/> des quotients incomplets de <TeX value={`$x$`}/> d'ordre <TeX value={`$i$`}/>, <TeX value={`$a_i$`}/> étant défini comme la partie entière de <TeX value={`$x_i$`}/>.
                </li>
              </ul>

              <div>(5)
                  <TeX value={
                    `$$
                      \\forall x \\in \\mathbb{R}_+, \\exists (a_i \\in \\mathbb{N}, x_i \\in \\mathbb{R}_+)_{i \\in \\mathbb{N}} /
                      x_0 = x,
                      \\forall i \\in \\mathbb{N}^*, \\left\\{
                        \\begin{matrix}
                          x_i = a_i + \\frac{1}{x_{i+1}} \\\\
                          x_i = a_i + q, q \\in \\mathbb{R}_+, q < a_i
                        \\end{matrix}
                      \\right.
                    $$`
                  }/>
              </div>

              <p>
                La suite des quotients incomplets de <TeX value={`$x$`}/> est appelée fraction continue de <TeX value={`$x$`}/>, tandis que les <TeX value={`$i$`}/> premiers termes constituent la réduite de <TeX value={`$x$`}/> d'ordre <TeX value={`$i$`}/>,
                que l'on notera <TeX value={`$[a_0, \\dotsc, a_i]$`}/> :
              </p>

              <div>(6)
                  <TeX value={
                    `$$
                      [a_0, \\dotsc, a_i] = a_0 + \\cfrac{1}{
                        a_1 + \\cfrac{1}{
                          a_2 + \\cfrac{1}{
                            \\dotsc + \\cfrac{1}{
                              a_{i-1} + \\cfrac{1}{
                                a_i
                              }
                            }
                          }
                        }
                      }
                    $$`
                  }/>
              </div>

              <p>
                Si <TeX value={`$x$`}/> est rationnel, il existe un rang à partir duquel tous les termes de la suite des quotients incomplets sont nuls.
                En revanche, pour <TeX value={`$x$`}/> irrationnel, il existe une infinité de quotients incomplets non nuls et la suite des réduites de <TeX value={`$x$`}/> converge vers <TeX value={`$x$`}/> :
              </p>

              <div>(7)
                <TeX value={
                  `$$
                    \\lim_{i \\to \\infty} [a_0, \\dotsc, a_i] = x
                  $$`
                }/>
              </div>

              <br/><br/>

            </div>

            <div id="rational" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h4>Ecriture sous forme rationnelle</h4>
              <p>
                Une réduite d'ordre <TeX value={`$N$`}/> s'écrit sous forme d'un nombre rationnel <TeX value={`$p_0/q_0$`}/> par des réductions au même dénominateur
                successives en partant du terme d'ordre <TeX value={`$N$`}/> sans aucune perte de précision :
              </p>

              <div>(8)
                  <TeX value={
                    `$$
                      \\forall (a_i)_{i \\in [0,N], N \\in \\mathbb{N}}, [a_0, a_1, \\dotsc, a_N] = (p_0,q_0) / \\left\\{
                        \\begin{matrix}
                          (p_N,q_N) = (a_N,1) \\\\
                          \\forall i \\in [0,N-1], (p_i,q_i) = (a_i p_{i+1} + q_{i+1}, p_{i+1})
                        \\end{matrix}
                      \\right.
                    $$`
                  }/>
              </div>

              <br/><br/>

              <p>
                La question est à présent de savoir comment appliquer la contrainte d'un numérateur et d'un dénominateur n'ayant pas plus de 20 chiffres significatifs.
              </p>

            </div>

            <div id="error" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
              <h4>Mesure d'erreur</h4>
              <p>
                Considérons <TeX value={`$e$`}/> la précision (e pour "erreur") souhaitée pour le calcul de <TeX value={`$ln(\\pi)$`}/>.
              </p>

              <p>
                L'approximation de l'aire d'une fonction <TeX value={`$f$`}/> deux fois continûment différentiable sur le segment <TeX value={`$[a,b]$`}/>
                par un rectangle de largeur <TeX value={`$b-a$`}/> et de hauteur <TeX value={`$f(\\frac{a+b}{2})$`}/> est associée à
                une <a href="https://fr.wikipedia.org/wiki/Calcul_num%C3%A9rique_d%27une_int%C3%A9grale#Formule_de_Simpson">erreur</a> <TeX value={`$e$`}/> que l'on peut écrire de la manière suivante :
              </p>

              <div>(9)
                  <TeX value={
                    `$$
                      e = -\\frac{(b-a)^5}{2880} f^{(4)}(\\xi), \\xi \\in [a,b]
                    $$`
                  }/>
              </div>

              <p>
                Soit ici, avec <TeX value={`$f(x)=\\frac{1}{x}$`}/> et <TeX value={`$b-a = \\frac{\\pi - 1}{N}$`}/> :
              </p>

              <div>(10)
                  <TeX value={
                    `$$
                      e = \\frac{1}{120} \\left( \\frac{\\pi - 1}{N} \\right)^5 \\frac{1}{\\xi^5}, \\xi \\in [a,b]
                    $$`
                  }/>
              </div>

              <p>
                Que l'on peut majorer sur l'intervale <TeX value={`$[1,\\pi]$`}/> par :
              </p>

              <div>(11)
                  <TeX value={
                    `$$
                      e \\le \\frac{1}{120} \\left( \\frac{\\pi - 1}{N} \\right)^5
                    $$`
                  }/>
              </div>

              <p>
                De sorte que pour <TeX value={`$N$`}/> intervalles, l'erreur est majorée par :
              </p>

              <div>(12)
                  <TeX value={
                    `$$
                      e \\le \\frac{1}{120} \\frac{(\\pi - 1)^5}{N^4}
                    $$`
                  }/>
              </div>

              <p>
                De là, on déduit qu'une précision <TeX value={`$e$`}/> peut être atteinte pour <TeX value={`$N \\ge \\sqrt[4]{\\frac{1}{120} \\frac{(\\pi - 1)^5}{e}}$`}/>.
              </p>

              <p>
                Toutefois, ces calculs n'intègrent pas l'incertitude relative à <TeX value={`$\\pi$`}/>, <TeX value={`$e_{\\pi}$`}/>.
                Cette dernière apporte une incertitude <TeX value={`$\\frac{e_{\\pi}}{\\pi}$`}/> à la valeur de <TeX value={`$ln(\\pi)$`}/>.
                Pour qu'elle soit négligeable, il suffit qu'elle soit d'un ordre de grandeur inférieure à l'incertitude liée à l'approximation de l'intégrale
                par la méthode du point milieu, soit :
              </p>

              <div>(13)
                  <TeX value={
                    `$$
                      \\frac{e_{\\pi}}{\\pi} < \\frac{e}{10}
                    $$`
                  }/>
              </div>

              <p>
                De sorte qu'il suffit de calculer <TeX value={`$\\pi$`}/> avec une précision <TeX value={`$\\frac{e\\pi}{10}$`}/>.
                Et pour rendre cette expression indépendante de <TeX value={`$\\pi$`}/> et faciliter l'implémentation, il suffit de
                calculer <TeX value={`$\\pi$`}/> avec une précision <TeX value={`$\\frac{e}{10}$`}/> (<TeX value={`$\\pi > 1$`}/>).
              </p>

              <p>
                Pour la suite, la question est de savoir quelle précision maximale <TeX value={`$e$`}/> peut être recherchée
                dans l'approximation de <TeX value={`$ln(\\pi)$`}/> sachant que l'approximation de cette valeur par un quotient <TeX value={`$P/Q$`}/> ne
                peut se faire avec plus de 20 chiffres significatifs au numérateur comme au dénominateur.
              </p>

              <p>
                L'erreur relative à l'approximation d'un réel positif <TeX value={`$x$`}/> par sa réduite d'ordre <TeX value={`$N$`}/> vaut
                par définition <TeX value={`$|x - [a_0, \\dotsc, a_N]|$`}/>.
                Si on désigne par <TeX value={`$p$`}/> la fonction qui à un nombre associe sa puissance de 10
                (<TeX value={`$\\forall x \\in \\mathbb{R}_+, x = 10^{p(x)}q+r, q \\in \\mathbb{N}, r \\in \\mathbb{R}_+, r<10^{p(x)}$`}/>)
                et en reprenant la notation (8), on remarque que :
              </p>

              <div>(14)
                  <TeX value={
                    `$$
                     \\forall i \\in [0,N-1], p(a_i)+p(p_{i+1}) \\le p(p_i) \\le p(a_i)+p(p_{i+1})+2
                    $$`
                  }/>
              </div>

              <p>
                On peut donc encadrer le numérateur <TeX value={`$P$`}/> de <TeX value={`$ln(\\pi) \\sim P/Q$`}/> comme suit :
              </p>

              <div>(15)
                  <TeX value={
                    `$$
                     \\sum_{i=0}^{N}{p(a_i)} \\le p(P) \\le \\sum_{i=0}^{N}{p(a_i)} + 2N
                    $$`
                  }/>
              </div>

              <p>
                <TeX value={`$P$`}/> ne pouvant avoir plus de 20 chiffres significatifs, la réduite de <TeX value={`$ln(\\pi)$`}/> atteignant
                une précision <TeX value={`$e$`}/> doit être calculée à un ordre <TeX value={`$N$`}/> satisfaisant les conditions du (16).
                La première implique de rechercher <TeX value={`$N$`}/> "suffisamment grand" quand la deuxième et la troisième impliquent de
                rechercher <TeX value={`$N$`}/> "pas trop grand". La deuxième, si elle est satisfaite, permet d'éviter d'avoir à évaluer la troisième,
                qui est plus coûteuse en temps.
              </p>

              <div>(16)
                  <TeX value={
                    `$$
                      N \\in \\mathbb{N} / 
                      \\left\\{
                        \\begin{matrix}
                          |ln(\\pi) - [a_0, \\dotsc, a_N]| \\le \\frac{e}{10} \\\\
                          \\sum_{i=0}^{N}{p(a_i)} \\le 19 \\\\
                          [a_0, \\dotsc, a_N] = \\frac{P}{Q}, (P,Q) \\in ([1, 10^{20}] \\cap \\mathbb{N})^2
                        \\end{matrix}
                      \\right.
                    $$`
                  }/>
              </div>

              <p>
                Pour une erreur <TeX value={`$e$`}/> donnée, relative à <TeX value={`$ln(\\pi)$`}/>, nous allons procéder comme suit :
              </p>
              <ol>
                <li>Calculer <TeX value={`$\\pi$`}/> à la précision <TeX value={`$e_{\\pi}=\\frac{e}{10}$`}/></li>
                <li>Calculer <TeX value={`$ln(\\pi)$`}/> à la précision <TeX value={`$e$`}/></li>
                <li>Calculer sa réduite d'ordre minimal satisfaisant les conditions (16)</li>
              </ol>

            </div>
          </div>

          <div id="complexity" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
            <h4>Complexité</h4>

            <p>
              La complexité associée au calcul de <span className="code">Pi(i,j)</span> est <TeX value={`$O(i+j) + O(i^2)$`}/>.
              Nous n'avons pas établi la vitesse de convergence de cette suite, cela resterait à faire.
            </p>
            <p>
              La complexité associée au calcul de <span className="code">Ln(x)</span> avec un découpage en <TeX value={`$N$`}/> intervales est <TeX value={`$O(N)$`}/>.
              Nous avons montré en (12) que le nombre d'itérations était proportionnel à l'inverse de la racine quatrième de l'erreur <TeX value={`$e$`}/>,
              de sorte que <span className="code">Ln(x,e)</span> se calcule en <TeX value={`$O(\\frac{1}{\\sqrt[4]{e}})$`}/>.
              Ainsi, passer d'une précision de <TeX value={`$10^{-20}$`}/> à <TeX value={`$10^{-36}$`}/> requiert 2 fois plus de temps.
              Malgré le caractère concave de cette complexité, l'expérience montre que c'est de très loin l'étape la plus "coûteuse" temporellement.
            </p>
            <p>
              La complexité associée à l'écriture sous forme rationnelle d'une réduite d'ordre <TeX value={`$N$`}/> est <TeX value={`$O(N)$`}/>.

            </p>
            <p>
              La complexité associée à la détermination de la réduite d'ordre <TeX value={`$N$`}/> d'un réel positif fait intervenir les éléments suivants :
            </p>
            <ul>
              <li>
                Détermination de la puissance d'un nombre : tous les nombres manipulés étant inférieurs à <TeX value={`$10^{20}$`}/>,
                <TeX value={`$20$`}/> itérations sont requises au maximum. Cette dimension n'ajoute pas à la complexité de l'algorithme.
              </li>
              <li>
                Le calcul de la somme des puissances de quotients incomplets génère <TeX value={`$N$`}/> opérations.
              </li>
              <li>
                L'écriture sous forme rationnelle des réduites successives génère quant à elle <TeX value={`$\\frac{N(N+1)}{2}$`}/> opérations.
              </li>
            </ul>
            <p>
              Au total, la complexité est <TeX value={`$O(N^2)$`}/>. Reste le lien avec l'erreur, que nous ne sommes pas en mesure de déterminer.
              Cependant, un test simple d'approximation de <TeX value={`$\\pi$`}/> par un nombre rationnel satisfaisant aux conditions
              précédemment énoncées permet de constater que les temps de réponse sont excellents (47ms). Une précision à <TeX value={`$10^{-30}$`}/> est
              souhaitée mais non atteinte du fait de la saturation de la contrainte sur le nombre de chiffres significatifs.
            </p>
            <p className="center">
              <img src="result2.png" alt="Result2"/>
            </p>
          </div>

          <br/><br/>

          <div id="implementation" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
            <h4>Implémentation</h4>
            <p>
              Le choix a été fait de mettre en &oelig;uvre les différents algorithmes en JavaScript afin de faciliter leur intégration à une page HTML autoportante.
              En JavaScript, les nombres en virgule flottante sont limités à 15 chiffres significatifs, ce qui pose problème puisque 20 chiffres significatifs sont attendus ici.
              La librairie <a href="http://mikemcl.github.io/bignumber.js/">bignumber.js</a> pallie ce problème grâce à un 
              stockage et des méthodes de calcul adaptés en conséquence.
            </p>
            <p>
              Notons que l'<a href="http://mikemcl.github.io/bignumber.js/#toFr">API</a> de cette librairie comporte une méthode <span className="code">.toFraction([max]) ⇒ [string, string]</span>
              fournissant l'approximation d'un nombre réel en quotient de deux entiers naturels dont le dénominateur est borné par une valeur passée en paramètre.
              "In real life", cette fonction aurait été utilisée en remplacement des 2 dernières étapes (fraction continue et réduction en quotient),
              mais nous n'avons pas souhaité faire cette économie dans le cadre de cet exercice, d'autant qu'elle ne serait peut-être pas disponible dans d'autres langages de programmation.
            </p>
            <p>
              La présente page HTML utilise en outre les librairies <a href="https://facebook.github.io/react/">React</a>, <a href="https://getmdl.io/started/index.html">Material Design Lite</a> et <a href="https://www.mathjax.org/">MathJax</a>.
            </p>
            <p>
              Les fonctions de calcul ont été implémentées dans le cadre d'une approche de Test Driven Development (TDD).
              Les tests unitaires utilisent <a href="https://facebook.github.io/jest/">Jest</a> :
            </p>
            <br/><br/>
            <p className="center">
              <img src="tests.png" alt="Test report with Jest"/>
            </p>
            <p>
              <a href="https://github.com/mathieueveillard/lnpi">
                <button className="mdl-button mdl-js-button mdl-button--icon">
                  <i className="material-icons">arrow_forward</i>
                </button>
                GitHub
              </a>
            </p>
          </div>

          <div id="result" className="mdl-cell mdl-cell--8-col-desktop mdl-cell--2-offset-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet">
            <h4>Résultat</h4>
            <p>
              La meilleure approximation de <TeX value={`$ln(\\pi)$`}/> comme nombre rationnel dont ni le numérateur ni le 
              dénominateur n'a plus de 20 chiffres significatifs est obtenue en un peu moins de 20'. A noter que <TeX value={`$\\pi$`}/> n'a
              pas été calculé car la précision requise était très élevée et que nous ne disposions pas d'informations suffisantes
              sur la vitesse de convergence de la suite utilisée.
            </p>

            <br/><br/>

            <p className="result">
              <span><TeX value={`$ln(\\pi) \\sim \\frac{805218529432221}{703413564532511}$`}/> (précision : <TeX value={`$10^{-30}$`}/>)</span>
            </p>

            <br/><br/>

            <p className="center">
              <img src="result.png" alt="Result"/>
            </p>
          </div>

          <br/><br/>

          <br/><br/><br/><br/><br/>

          <footer className="mdl-mini-footer">
            <div className="mdl-mini-footer__left-section">
              <div className="mdl-logo"><a href="http://ignition-program.com/">Ignition</a></div>
              <ul className="mdl-mini-footer__link-list">
                <li>Mathieu Eveillard</li>
              </ul>
            </div>
          </footer>
        </main>
      </div>
    );
  }
}

export default App;
