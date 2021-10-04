
  

  const storge = {
    saveTag(data) {
      localStorage.setItem('Tag', JSON.stringify(data))
    },
  
    getTag() {
      return JSON.parse(localStorage.getItem('Tag')||'{}')
    }
  }

export default storge