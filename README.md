# Senior Front-End Engineer Home Assessment for Spotter.la

https://www.notion.so/spotterla/Senior-Front-End-Engineer-920523e51ce14504a13ee4e16ac89399?pvs=4

## To Run

```
$ yarn && yarn dev
```

Optionally you can build and preview the timer in production-ready form

```
$ yarn && yarn build && yarn preview
```

The interactive elements are all keyboard-tabbable. As well, the bottom controls have keyboard shortcuts.

- Add Time: Option+A
- Start/Stop: Option+Spacebar
- Reset to last set time: Option+R
- Reset to initial time: Shift+Option+R (this is also avaible by double-clicking the control)

## Bonus Round

- Light and Dark modes that initially adhere to your system setting
- Dual function Reset button
- Various UI style niceties
- 🐰🥚

## 🥲

- Realized too late that Apex Charts wasn't going to allow me to easily add the gauge end marker/control.
- Another shortcoming I discovered with Apex (*have* used it before but in less interactive cases) was with the animation - it has to follow and ease to the next value rather than immediately ticking.
- There are some known issues with bad actor inputs on the `react-contenteditable` timer value. With time to refactor I might have chosen Atlassian's editable text component instead.
- Had some other ideas for enhancing the UX such as flashing the countdown and/or adding color or a gradient to the gauge when > 90% complete.
- Additionally, the edit time / reset time behavior concepts could perhaps be made more intuitive or simplified 
