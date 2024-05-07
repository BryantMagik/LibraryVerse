import { Create, SimpleForm, TextInput, SelectField, required, ImageInput, ImageField } from "react-admin"

export const BookCreate = () => {

    return (
        <Create>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} label="Titulo" />
                <TextInput source="description" validate={[required()]} label="Descripción" />
                <TextInput source="coverImage" label="Imagen del libro" />
                <TextInput source="genre" validate={[required()]} label="Genero" />
                <TextInput source="tags" label="Tags" />
                <TextInput source="authorId" label="Nombre del auto" />
                <TextInput source="chapters" />
            </SimpleForm>
        </Create>
    )
}
