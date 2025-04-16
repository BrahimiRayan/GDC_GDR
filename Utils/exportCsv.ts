// utils/exportToCsv.js
export function exportToCsv(filename : string, rows : object[]) {
    const processRow = (row : object) => {
      return Object.values(row)
        .map(value => {
          if (value === null || value === undefined) return ''
          // Escape quotes in strings
          if (typeof value === 'string') {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value
        })
        .join(',')
    }
  
    let csvContent = ''
    
    // Add headers
    if (rows.length > 0) {
      csvContent += processRow(Object.keys(rows[0])) + '\r\n'
    }
    
    // Add rows
    rows.forEach(row => {
      csvContent += processRow(row) + '\r\n'
    })
  
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }