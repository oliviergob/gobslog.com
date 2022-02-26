/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import styled from "styled-components"

const IconsContainer = styled.div`
  font-size: 20px;
`

const IconLink = styled.a`
  margin-right: 10px;
`


const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
         <strong>{author.name}</strong> {author?.summary || null}
         {` `}
         <IconsContainer>
          <IconLink href={social?.github} target="_blank">
            <FontAwesomeIcon icon={faGithub} />     
          </IconLink>
          <IconLink href={social?.linkedin} target="_blank">
            <FontAwesomeIcon icon={faLinkedinIn} size="sm"/>    
          </IconLink>  
         </IconsContainer>

          {social?.twitter && 
            <a href={`https://twitter.com/${social?.twitter || ``}`}>
              You should follow them on Twitter
              <FontAwesomeIcon icon="fa-brands fa-github" />
            </a>
          }
          
        </p>
      )}
    </div>
  )
}

export default Bio
