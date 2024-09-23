export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  

    if (date.getFullYear() === now.getFullYear()) {
      return formattedDate; 
    } else {
      return `${date.getFullYear().toString().slice(-2)}`;
    }
  };
  