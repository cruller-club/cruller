require "test_helper"

class ColorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get colors_index_url
    assert_response :success
  end

  test "should get show" do
    get colors_show_url
    assert_response :success
  end

  test "should get error" do
    get colors_error_url
    assert_response :success
  end
end
