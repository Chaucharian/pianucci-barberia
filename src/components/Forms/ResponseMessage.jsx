import styled from 'styled-components'

export const ResponseMessage = styled.p`
    ${({ error }) => `
    color: ${error ? `red` : `green`};
`}
`
