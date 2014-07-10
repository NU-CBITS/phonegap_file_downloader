var newStr;
describe("Downloader", function() {
  var downloader;

  beforeEach(function() {
    downloader = new Downloader();
    var elements = [];
    fp = ["http://techslides.com/demos/sample-videos/small.mp4"];
    console.log = jasmine.createSpy("log");
  });

  it("should find instances of a file type, up to two digit IDs", function() {
    var str = "foofoofoo0foo0foo video05 baaaaarvideo1";
    var arr = downloader.findTags("video",str);

    expect(arr).toEqual(["video05","video1"]);
  });

  it("should correctly parse the trigger IDs", function() {
    var str = "foofoofoo0foo0foo video5 baaaaar video1 video03 video82";
    downloader.findTags("video",str);
    downloader.insert("video",str);

    expect(elemNums).toEqual(["5","1","03","82"]);
  });

  it("should insert HTML tags where the string triggers it if there's a valid source", function() {
    var str = "foofoofoo0foo0foo video0 baaaaarvideo01";
    var arr = downloader.findTags("video",str);
    newStr = downloader.insert("video",str);

    expect(newStr).toMatch("<video");
  });

  it("should insert 'Not Available' message if the source is invalid", function() {
    var str = "foofoofoo0foo0foo video5";
    var arr = downloader.findTags("video",str);
    newStr = downloader.insert("video",str);

    expect(newStr).toMatch("This video is unavailable.");
  });


});
