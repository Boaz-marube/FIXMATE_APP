export const formatCustomerName = (name: string): string => {
    if (!name) return 'Customer'
    
    // Extract clean name (remove numbers, special characters)
    const cleanName = name.split(/[0-9@._-]/)[0]
    
    if (!cleanName) return 'Customer'
    
    // Capitalize first letter, lowercase rest
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase()
  }
  
  export const formatFixerName = (name: string): string => {
    if (!name) return 'Fixer'
    
    // Extract first name and add Dr. prefix
    const firstName = name.split(/[0-9@._-]/)[0]
    
    if (!firstName) return 'Fixer'
    
    const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    return `Fixer. ${capitalizedName}`
  }
  
  export const formatAdminName = (name: string): string => {
    if (!name) return 'Admin'
    
    // Extract clean name (remove numbers, special characters)
    const cleanName = name.split(/[0-9@._-]/)[0]
    
    if (!cleanName) return 'Admin'
    
    // Capitalize first letter, lowercase rest
    return cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase()
  }