
export const mobile = number => {
  let rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
  return rule.test(number)
}
export const password = text => {
  let rule = /^[a-zA-Z0-9_]{6,16}$/
  return rule.test(text)
}