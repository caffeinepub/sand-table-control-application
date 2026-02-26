import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

module {
  public type LEDPreset = {
    // Define LED preset structure as needed
    brightness : Nat;
    color : Text;
  };

  public type Pattern = {
    name : Text;
    gCode : Text;
    ledPresets : ?LEDPreset;
    thumbnail : ?Text;
    createdAt : Time.Time;
  };

  public type PatternWithOwner = {
    pattern : Pattern;
    owner : Principal;
  };

  public module Pattern {
    public func compareByCreatedAt(a : Pattern, b : Pattern) : Order.Order {
      if (a.createdAt < b.createdAt) { #less } else if (a.createdAt > b.createdAt) {
        #greater;
      } else { #equal };
    };
  };
};
