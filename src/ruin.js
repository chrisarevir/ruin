class Ruin {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }

  update() {
    let output = ''
    let complete = 0

    for (let i = 0, n = this.queue.length; i < n; i += 1) {
      const { from, to, start, end } = this.queue[i]
      let { char } = this.queue[i]
      if (this.frame >= end) {
        complete += 1
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="shift">${char}</span>`
      } else {
        output += from
      }
    }

    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = window.requestAnimationFrame(this.update)
      this.frame += 1
    }
  }

  setText(newText) {
    const oldText = this.el.innerHTML
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise(resolve => {
      this.resolve = resolve
    })

    this.queue = []

    for (let i = 0; i < length; i += 1) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }

    window.cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  run(phrases, index = 0) {
    this.setText(phrases[index]).then(() => {
      const next = (index + 1) % phrases.length
      setTimeout(this.run.bind(this, phrases, next), 2000)
    })
  }
}

const lines = [
  '                       ',
  '                       ',
  '                       ',
  'Procore,',
  "Don't worry, I haven't done anything too bad,",
  'yet.',
  '                       ',
  'Did you know,',
  'you could lock your computer,',
  'with a keyboard shortcut?',
  "It's simple really.",
  'On Macs: cmd + ctrl + q',
  'On Windows: win + L',
  "Don't walk away from your computer,",
  'without locking it first ;)',
  "It's a security risk if you don't ^^;",
  '                       ',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
  'bit.ly/g-wagon',
]

const element = document.querySelector('.text')
const fx = new Ruin(element)

fx.run(lines)
