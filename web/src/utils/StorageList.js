
  

  const storge = {
    saveList(data) {
      localStorage.setItem('List', JSON.stringify(data))
    },
  
    getList() {
      return JSON.parse(localStorage.getItem('List')||'{}')
    }
  }

export default storge