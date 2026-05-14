export default function InputField({
    placeholder,
    type,
    value,
    onChange
}) {
    return (
        <input
            className="w-[300px] rounded-[50px] p-[10px] text-white border border-gray-400"
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
        />
    )
}