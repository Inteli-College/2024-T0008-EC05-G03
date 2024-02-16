import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Equipe = () => {
  const members = [
    { name: 'Antonio Artimonte Vaz Guimarães', img: 'url_da_imagem1.jpg' },
    { name: 'Daniel Quintão Dávila', img: 'url_da_imagem2.jpg' },
    { name: 'Gabriel Gallo Menequini Coutinho', img: 'url_da_imagem3.jpg' },
    { name: 'Gustavo Machado Esteves', img: '' },
    { name: 'Laura Padilha Bueno', img: 'url_da_imagem5.jpg' },
    { name: 'Rafaela Cristina Rojas Lemos', img: 'url_da_imagem6.jpg' },
    { name: 'Raí de Oliveira Cajé', img: 'url_da_imagem7.jpg' },
  ];

  return (
    <div className="equipe-container">
      {members.map((member, index) => (
        <div key={index} className="member-card">
          <img src={member.img} alt={member.name} />
          <p>{member.name}</p>
        </div>
      ))}
    </div>
  );
};
