// Function to strip HTML tags and get clean text
export function stripHtmlTags(html: string): string {
  // Remove HTML tags using regex
  const cleanText = html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()

  return cleanText
}

// Function to create a preview of the content
export function createContentPreview(content: string, maxLength: number = 200): string {
  const cleanText = stripHtmlTags(content)
  return cleanText.length > maxLength 
    ? cleanText.substring(0, maxLength).trim() + '...' 
    : cleanText
}
