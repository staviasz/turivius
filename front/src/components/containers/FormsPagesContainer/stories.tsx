import FormPagesContainer from '.';

export default {
  title: 'FormPagesContainer',
  component: FormPagesContainer,
};

export const Template = () => {
  return (
    <div>
      <FormPagesContainer>
        <form
          action=""
          style={{
            width: '300px',
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <h1>StoryBook</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="name">nome: </label>
            <input type="text" id="name" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="email">e-mail: </label>
            <input type="text" id="email" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="password">senha: </label>
            <input type="text" id="password" />
          </div>
        </form>
      </FormPagesContainer>
    </div>
  );
};
