import { Autocomplete } from "mui-rff"
import { useGetSurveyNameList } from "../../stores/SurveyStore"


interface ISurveySelectProps {
    required?: boolean
    disabled?: boolean
    parentId?: number | null
    readOnly?: boolean
    label?: string
    name?: string
    size?:"medium"|"small"
    isParent?:boolean
    
}

const SurveySelect = (props: ISurveySelectProps) => {

    const { name="surveyId",size,readOnly = false, required = false,isParent=false, disabled = false, parentId=null,  label = "Anket" } = props
    const { isLoading, data = [] } = useGetSurveyNameList(parentId,isParent)
    return (
        <Autocomplete
            label={label!}
            name={name}
            size={size}
            options={data!}
            getOptionValue={(option:any) => option.id}
            getOptionLabel={(option) => option.name ?? "Yükleniyor..."}
            required={required}
            loadingText={"Yükleniyor..."}
            loading={isLoading}
            disabled={disabled}
            readOnly={readOnly}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                )
            }}
        />
    )
}

export default SurveySelect
