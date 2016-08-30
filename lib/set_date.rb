module SetDate
  def start=(arr)
    super(set_date(arr))
  end

  def end=(arr)
    super(set_date(arr))
  end

  def set_date(arr)
    year, month = arr[0].to_i, arr[1].to_i
    if year && month
      return Date.new(year, month)
    elsif year
      return Date.new(year)
    end
  end
end
