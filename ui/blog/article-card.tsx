import React from 'react';
import styled from 'styled-components';
import NativeLink from 'next/link';
import format from 'date-fns/format';
import LazyLoad from 'react-lazyload';
import { withPlaceholder } from '../../lib/images';
import { Tag } from '../../ui/blog/tag';
import { AuthorDetails } from './authors';

const Link = styled(NativeLink)`
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-color: #fff;

  &:hover {
    opacity: var(--hover-opacity);
  }
`;

const Cover = styled.div<{ src: string; isPlaceholder?: boolean }>`
  display: block;
  max-width: 100%;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0.5rem 0.5rem 0 0;

  & > * {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.src});
    ${(props) => (props.isPlaceholder ? 'filter: blur(25px);' : '')}
  }
`;

const Placeholder = styled.div`
  display: block;
  max-width: 100%;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const TagContainers = styled.div``;

const Content = styled.div`
  padding: 1rem 1.5rem;
  text-align: left;
`;

const Title = styled.h3`
  color: var(--colors-text);
`;

const Description = styled.p`
  color: var(--colors-dim);
`;

const Time = styled.time`
  color: var(--colors-dim);
  font-size: 0.8rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;

  & > div:nth-child(2) {
    margin-left: 10px;
    display: flex;
    text-align: left;
    flex-direction: column;
    justify-content: center;

    & > span {
      color: var(--colors-accent);
    }
  }
`;

export const ArticleCard: React.FC<{
  title: string;
  description: string;
  author?: AuthorDetails;
  image: string;
  link: string;
  date: string;
  tags: string[];
}> = ({ title, author, description, image, link, date: rawDate, tags }) => {
  const date = new Date(rawDate);
  const { large, placeholder, hasPlaceholder } = withPlaceholder(image);

  return (
    <Link href={link} as="a" title={title}>
      <LazyLoad
        height={150}
        once
        offset={300}
        placeholder={
          hasPlaceholder ? (
            <Cover src={placeholder} isPlaceholder={hasPlaceholder}>
              <div />
            </Cover>
          ) : (
            <Placeholder />
          )
        }
        debounce={500}
      >
        <Cover src={large} isPlaceholder={false}>
          <div />
        </Cover>
      </LazyLoad>
      <Content>
        <Details>
          <div>
            <span title={author.name}>{author.avatar}</span>
          </div>
          <div>
            <span title={author.name}>{author.name}</span>
            <Time dateTime={date.toISOString()}>
              {format(date, 'EEEE, LLL do y')}
            </Time>
          </div>
        </Details>
        <Title>{title}</Title>
        <TagContainers>
          {tags.map((t) => (
            <Tag tag={t} key={t} asLink={false} />
          ))}
        </TagContainers>
        <Description>{description}</Description>
      </Content>
    </Link>
  );
};