let $prompt = document.getElementById('prompt')
let $prev = document.getElementById('prev')

const render = v => {
  v.forEach(a => {
    let el = document.createElement('pre')
    el.className += a.c || ''
    el.innerText = a.r
    $prev.appendChild(el)
  })
}

const rlink = l => {
  let el = document.createElement('a')
  el.href = l
  el.target = '_blank'
  el.innerText = l
  $prev.appendChild(el)
}


const cout = a => render([{r:a}])
const cerr = a => render([{c:'err',r:a}])
const cok = a => render([{c:'ok',r:a}])


cok(`arrathilar
~~~~~~~~~~`)
cout(`help:
  ls: show files and directories
  cat <file>: print a file out
  echo <...stuff>: print some text to the screen`)

let files = {
  'github.link': `https://github.com/arrathilar`,
  'about.txt': `I'm a frontend developer from Rivne. I make mildly interesting things occasionally. This is my website.

Check out my github for some project's I've worked on`,
  'term.txt': `This "terminal" is implemented in JS because I thought it would be cool for a landing page. That's it.`
}

let funcs = {
  clear() {
    $prev.innerHTML = ''
  },
  echo(...a) {
    cout(a.join(' '))
  },
  ls() {
    Object.keys(files).forEach(cout)
  },
  cat(f) {
    cok(`${f}
${f.split('').map(a=>'~').join('')}`)
    f.endsWith('.link') ? rlink(files[f]) : cout(files[f])
  }
}

$prompt.focus()
$prompt.select()

const parse = i => {
  s = i.split(' ').filter(a => a)
  if (s.length === 0) return
  cout('~ $ ' + i)
  funcs[s[0]].apply(undefined, s.slice(1))
}

let history = ['ls']

let hi = 1;

const tabComplete = a => {
  let s = a.split(' ').filter(b => b)
  if (s.length === 0) return a
  for (l of Object.keys(s.length > 1 ? files : funcs)) {
    if (l.startsWith(s[s.length - 1]))
      return [...s.slice(0, -1), l].join(' ')
  }
  return a
}

$prompt.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    parse($prompt.value)
    history.push($prompt.value)
    $prompt.value = ''
    hi = history.length
  } else if (e.key === 'ArrowUp') {
    if (hi <= history.length && hi > 0) {
      $prompt.value = history[--hi]
    }
  } else if (e.key === 'ArrowDown') {
    if (hi + 1 < history.length && hi >= 0) {
      $prompt.value = history[++hi]
    }
  } else if (e.key === 'Tab') {
    e.preventDefault()
    $prompt.value = tabComplete($prompt.value)
  } else {
    hi = history.length
  }
  //cout(e.key)
})





