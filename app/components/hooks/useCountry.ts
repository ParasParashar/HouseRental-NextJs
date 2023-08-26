import countries from "world-countries"
const formatedCountries = countries.map((country) => (
    {
        value: country.cca2,
        label: country.name.common,
        flag: country.flag,
        latlng: country.latlng,
        region: country.region
    }
));

const useCountries = () => {
    const getAll = () => formatedCountries;
    const getByvalue = (value: string) => {
        return formatedCountries.find((item) => item.value === value)
    }
    return {
        getAll,getByvalue
    }
}
export default useCountries;