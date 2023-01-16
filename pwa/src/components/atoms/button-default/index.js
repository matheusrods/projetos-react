import { Button, Loading } from './styles';

const ButtonDefault = ({ type, label, isLoading, disabled, theme, ...rest }) => {
    return (
        <Button type={type} disabled={isLoading || disabled} theme={theme} {...rest}>
            {isLoading ? <Loading /> : label}
        </Button>
    );
}

export default ButtonDefault;