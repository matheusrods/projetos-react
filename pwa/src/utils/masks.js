const masks = {
  cpf: {
    mask: '999.999.999-99',
    regx(value) {
      if (!value) return;
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, ' $1.$2.$3-$4');
    },
    remove(value) {
      if (!value) return;
      return value.replace(/[^\d]+/g, '');
    },
  },
}

export default masks;
